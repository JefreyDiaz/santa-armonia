const WHATSAPP_NUMBER = "573157274521";

export function getWhatsAppServiceLink(servicio: string): string {
  const mensaje = `Hola, quiero reservar el servicio de ${servicio}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}

/** Mensaje genérico cuando la web ya no toma reservas en línea. */
export function getWhatsAppReservaGeneralLink(): string {
  const mensaje =
    "Hola, quiero información para agendar una cita en Spa Santa Armonía.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
}
