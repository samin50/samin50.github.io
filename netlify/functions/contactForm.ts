interface ContactFormBody {
    name: string;
    email: string;
    message: string;
  }
  
  export async function handler(event: any, context: any) {
    const body: ContactFormBody = JSON.parse(event.body);
    const { name, email, message } = body;
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact form submission successful' }),
    };
  };
  