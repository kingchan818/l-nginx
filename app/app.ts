import express, { Application, Response, Request } from 'express';
import { DataSource, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { entityArray } from './models';
import { Student } from './models/student';
import { Teacher } from './models/teacher';
const app: Application = express();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'demo100.cloud',
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: process.env.PRODUCTION === 'true' ? false : true,
    entities: [...entityArray],
});

AppDataSource.initialize()
    .then(() => {
        console.info('data source initialized!');
    })
    .catch((err) => {
        console.error('Error during initialization', err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/student', async (req: Request, res: Response) => {
    const studentRepo = AppDataSource.getRepository(Student);

    const student = studentRepo.create({ name: req.body.name, homework: req.body.homework });
    const savedObj = await studentRepo.save(student);
    res.json(savedObj);
});

app.post('/teacher', async (req: Request, res: Response) => {
    const teacherRepo = AppDataSource.getRepository(Teacher);

    const teacher = teacherRepo.create({ name: req.body.name });
    const savedObj = await teacherRepo.save(teacher);
    res.json(savedObj);
});

app.get('/', async (req: Request, res: Response) => {
    const students = await AppDataSource.getRepository(Student).find({ order: { id: 'ASC' } });
    const teachers = await AppDataSource.getRepository(Teacher).find({ order: { id: 'ASC' } });

    res.json({ students, teachers });
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port 9999 on ${process.env.CONTAINERID}`);
});
