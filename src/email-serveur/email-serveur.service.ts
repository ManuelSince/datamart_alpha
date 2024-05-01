import { Injectable } from '@nestjs/common';
import { CreateEmailServeurDto } from './dto/create-email-serveur.dto';
import { UpdateEmailServeurDto } from './dto/update-email-serveur.dto';
import { MailService } from './email-serveur.interface';
import { MailerService as MailerMain } from '@nestjs-modules/mailer';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import * as path from 'path';
import * as pug from 'pug';

@Injectable()
export class EmailServeurService implements MailService {
  constructor(private readonly mailerMain: MailerMain) {}

  /**
   * Sends an email using the provided data.
   *
   * @param {object} datamailer - The data for the email.
   * @param {string} datamailer.templete - The template for the email body.
   * @param {object} datamailer.dataTemplete - The data to be used in the email template.
   * @param {string} datamailer.to - The recipient of the email.
   * @param {string} datamailer.subject - The subject of the email.
   * @param {string} datamailer.text - The plain text version of the email body.
   * @return {Promise<void>} A promise that resolves when the email is sent.
   */
  async sendMail(datamailer): Promise<void> {
    const render = this._bodytemplete(
      datamailer.templete,
      datamailer.dataTemplete,
    );
    await this._processSendEmail(
      datamailer.to,
      datamailer.from,
      datamailer.subject,
      datamailer.text,
      render,
    );
  }

  /**
   * Sends an email using the provided email server.
   *
   * @param {CreateEmailServeurDto} email - The email object containing the recipient, subject, and text.
   * @return {Promise<void>} - A promise that resolves when the email is sent successfully.
   */
  async sendMailSandBox(email: CreateEmailServeurDto): Promise<void> {
    const {
      to,
      html,
      from,
      subject,
      text,
      title,
      description,
      name,
      url_link,
    } = email;
    const templateFile = path.join(
      __dirname,
      '../../src/email-serveur/templete/notification.pug',
    );
    const fileImg = path.join(
      __dirname,
      '../../src/email-serveur/public/img/wojo-banner-blue.png',
    );
    const socialMediaImg = path.join(
      __dirname,
      '../../src/email-serveur/public/img/wojo-logo.png',
    );
    const imageData = readFileSync(fileImg).toString('base64');
    const imageDataSocialMedia =
      readFileSync(socialMediaImg).toString('base64');
    const date = new Date();
    const aWeekLater = new Date(date.setDate(date.getDate() + 7));
    const data = {
      title: 'Demande de renseignements sur votre entreprise',
      img: imageData,
      introducings: `Bonjour ${name}`,
      url_link,
      description: description
        ? description
        : `Bonjour ${name}, Vous trouverez ci après un lien vers un formulaire de renseignements à remplir avant ${aWeekLater}`,
      imgSocial: imageDataSocialMedia,
    };
    console.log(email);
    const render = this._bodytemplete(templateFile, data);
    await this._processSendEmail(
      to,
      'wojo.com',
      'Demande de renseignements concernant votre entreprise',
      data.description,
      render,
    );
  }
  /**
   * Generate the function comment for the given function body.
   *
   * @param {string} templete - The path to the template file.
   * @param {Object} data - The data object to be passed to the template.
   * @return {string} The rendered template.
   */
  _bodytemplete(templete, data) {
    return pug.renderFile(templete, { data });
  }

  /**
   * Sends an email with the specified details.
   *
   * @param {string} to - The recipient of the email.
   * @param {string} subject - The subject of the email.
   * @param {string} text - The plain text content of the email.
   * @param {string} body - The HTML content of the email.
   * @return {Promise<void>} A promise that resolves when the email is sent successfully.
   */
  async _processSendEmail(to, from, subject, text, body): Promise<void> {
    await this.mailerMain
      .sendMail({
        to,
        from,
        subject,
        text,
        html: body,
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch((e) => {
        console.log('Error sending email', e);
      });
  }
}
