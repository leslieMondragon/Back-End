import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: 'lesliex2398@gmail.com',
    pass: 'VMx2QdfRpuc7w9k'
  }
})

export default transport