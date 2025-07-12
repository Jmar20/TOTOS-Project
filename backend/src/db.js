import mongoose from 'mongoose';

export const connectDB = async ()=> {
    try {
        await mongoose.connect('mongodb+srv://cesargabrieltorresflorez:N0vfoRWkaVEKKQVh@cluster0.xrbdb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Database is connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}