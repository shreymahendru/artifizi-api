import { Event } from "../../models/event";

export interface EventRepository
{
    save(event: Event): Promise<void>;
    getAll(): Promise<Array<Event>>;
    get(id: string): Promise<Event>;
    delete(id: string): Promise<void>;
}