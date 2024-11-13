export interface Partido {
    id: string;
    local: string;
    visitor: string;
    competition_name: string;
    date: string;
    time?: string; 
    local_shield: string;
    visitor_shield: string;
    status: string;
  }