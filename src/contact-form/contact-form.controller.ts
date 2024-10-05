import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { CreateContactFormDto } from './dto/create-contact-form.dto';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';
import { Response } from 'express';

@Controller('contact-form')
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createContactFormDto: CreateContactFormDto) {
    return this.contactFormService.create(createContactFormDto);
  }

  @Get('export-pdf')
  async exportUsersToPDF(@Res() res: Response) {
    try {
      console.log('Ingresando al controlador de exportación de PDF'); // Agrega este log
      const filePath = await this.contactFormService.exportContactsToPDF();
      // Enviar el archivo PDF como respuesta para su descarga
      return res.download(filePath);
    } catch (error) {
      console.error('Error al exportar contacts a PDF:', error);
      res.status(500).send('Error al generar el PDF');
    }
  }

  @Get()
  findAll() {
    return this.contactFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactFormDto: UpdateContactFormDto) {
    return this.contactFormService.update(id, updateContactFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormService.remove(id);
  }
}
