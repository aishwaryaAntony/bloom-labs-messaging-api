# bloom-labs-messaging-api

Execute command to add model files
====================================

1. Incoming Message Table:
    npx sequelize-cli model:generate --name IncomingMessage --attributes member_token:string,phone_number:string,country_code:string,email:string,name:string,description:text,type:string,message_purpose:string,email_content:text,created_by:integer,status:string

2. Message History Table:
    npx sequelize-cli model:generate --name MessageHistory --attributes member_token:string,phone_number:string,country_code:string,email:string,name:string,description:text,type:string,message_purpose:string,email_content:text,created_by:integer,status:string


To run the application
====================================
    1.  > npx sequelize-cli db:create
    2.  > npx sequelize-cli db:migrate
    3.  > npm run build 
    4.  > for develop ----> npm start | for server ----> npm start-server

    