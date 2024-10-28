export interface Apuestas {
    id: string
    userId: string | null
    partidoId: string
    fechaApuesta: string
    fechaPartido: string
    resultadoApostado: string
    partido: string
    estado: string
    multiplicador: number 
    monto: number
}