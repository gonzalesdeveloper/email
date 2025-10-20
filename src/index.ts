import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes';

export class Server{
    public app: express.Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    async listen(){
        await this.app.listen(this.app.get('port'));
        console.log("pueeto abierto", 3000);
    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void{
        this.app.use('/email', emailRoutes);
    }

    start(): void{
        this.app.listen(this.app.get('port'), ()=>{
            console.log("puerto corriendo en " , this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();