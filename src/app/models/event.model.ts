export interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    capacity: number;
    registeredCount: number;
    category: string;
}