export interface Partido {
    id: string;
    local: string;
    visitor: string;
    competition_name: string;
    date: string; // Mantén esta propiedad
    time?: string; // Añade esta propiedad como opcional
    local_shield: string;
    visitor_shield: string;
    status: string;
  }
  