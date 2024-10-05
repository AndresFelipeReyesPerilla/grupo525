import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ContactFormModule } from './contact-form/contact-form.module';
import { ContactFormController } from './contact-form/contact-form.controller';
import { ContactFormService } from './contact-form/contact-form.service';
import { DbService } from './db.service';

@Module({
  imports: [ContactFormModule],
  controllers: [AppController, ContactFormController],
  providers: [ContactFormService, DbService], // Servicios necesarios

})
export class AppModule {}
