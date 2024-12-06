import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService], // Déclare le service comme fournisseur
  exports: [MailService],   // Exporte le service pour l'utiliser dans d'autres modules
})
export class MailModule {}
