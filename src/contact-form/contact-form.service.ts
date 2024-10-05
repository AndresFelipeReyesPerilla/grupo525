import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';
import { DbService } from 'src/db.service';
import * as PDFDocument from 'pdfkit';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ContactFormService {

  constructor(private database: DbService){}

  async create(createContact: CreateContactFormDto) {
    
    const countByCity = await this.database.contact.count({ where: { city: createContact.city } });
    if (countByCity >= 3) {
      throw new BadRequestException('Solo 3 registros por city.');
    }

    const age = this.calculateAge(createContact.date)
    if (age < 18) {
      throw new BadRequestException('Debes ser mayor de edad');
    }
    return this.database.contact.create({ data: createContact })
  }

  findAll() {
    return this.database.contact.findMany();
  }

  findOne(id: string) {
    return this.database.contact.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateContact: UpdateContactFormDto) {
    return this.database.contact.update({
      where: { id: id },
      data: updateContact,
    });
  }

  remove(id: string) {
    return this.database.contact.delete({
      where: { id: id },
    });
  }

  calculateAge(birthDateString: string): number {
    const birthDate = new Date(birthDateString);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Si el mes actual es anterior al mes de nacimiento, o es el mismo mes pero el día actual es menor que el de nacimiento
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  async exportContactsToPDF(): Promise<string> {
    const contacts = await this.database.contact.findMany();
    const doc = new PDFDocument();
    const filePath = join(__dirname, '..', '..', 'exports', 'contacts.pdf');
    console.log("aqui", filePath)
    const writeStream = createWriteStream(filePath);

    doc.pipe(writeStream);

    doc.fontSize(20).text('Contact List', { align: 'center' });
    doc.moveDown();

    contacts.forEach((contact) => {
      doc.fontSize(12).text(`Name: ${contact.name}`);
      doc.text(`Email: ${contact.email}`);
      doc.text(`City: ${contact.city}`);
      doc.moveDown();
    });

    doc.end();

    // Manejo de errores y éxito
    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log('PDF generado correctamente');
        resolve(filePath);
      });

      writeStream.on('error', (err) => {
        console.error('Error al generar el PDF', err);
        reject(err);
      });
    });
  }
}
