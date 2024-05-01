export class CreateEmailServeurDto {
  to: string;
  url_link: string;
  name?: string;
  from?: string;
  html?: string;
  
  subject?: string;
  text?: string;
  title?: string;
  description?: string;
  
}
