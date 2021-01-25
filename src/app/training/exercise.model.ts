export interface Exercise {
  calories: number;
  date?: Date;
  duration: number;
  id: string;
  name: string;
  state?: 'completed' | 'cancelled' | null;
}
