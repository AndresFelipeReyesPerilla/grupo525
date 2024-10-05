import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { DbService } from 'src/db.service';

@Module({
  controllers: [ContactFormController],
  providers: [ContactFormService, DbService],
})
export class ContactFormModule {}
