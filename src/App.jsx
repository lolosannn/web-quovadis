import { useState, useMemo, useRef, useEffect } from "react";
import {
  MapPin,
  Search,
  X,
  Music,
  Ticket,
  Sparkles,
  Phone,
  ArrowLeft,
  User,
  MessageCircle,
  Globe,
  Compass,
  AlertCircle,
  Loader2,
  Settings,
  Plus,
  Pencil,
  Trash2,
  Save,
  CheckCircle2,
  Upload,
} from "lucide-react";

const DIAS_CORTOS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES_CORTOS = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

function isoDeHoy(offsetDias = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDias);
  return d.toISOString().slice(0, 10);
}

function formatFechaCorta(fechaISO) {
  if (!fechaISO) return "";
  const [y, m, d] = fechaISO.split("-").map(Number);
  const fecha = new Date(y, m - 1, d);
  return `${DIAS_CORTOS[fecha.getDay()]} ${d} ${MESES_CORTOS[m - 1]}`;
}

const FIESTAS_SEED = [
  {
    id: 1,
    region: "Zona Norte",
    edadMinima: 18,
    tipo: "Boliche",
    ambiente: "Aire libre",
    lat: -34.5885,
    lng: -58.4306,
    flyer: demoFlyer("FF6B4A", "Neón Sur", "Sáb 15 Ago"),
    nombre: "Neón Sur",
    tematica: "Electrónica",
    zona: "Palermo",
    barrio: "Palermo Soho",
    precio: 8000,
    fechaISO: "2026-08-15",
    hora: "23:30",
    genero: "Techno / House",
    vibe: "Rooftop, luces láser, línea hasta las 6am",
    grad: "linear-gradient(135deg, #FF6B4A 0%, #8B7FD9 100%)",
    organizador: "Facu (Neón Sur)",
    telefonos: ["+54 9 11 4455-6677"],
    link: "https://instagram.com/neonsur",
  },
  {
    id: 2,
    region: "Zona Sur",
    edadMinima: 18,
    tipo: "Boliche",
    ambiente: "Cerrado",
    lat: -34.6212,
    lng: -58.3724,
    flyer: null,
    nombre: "Retro Fiebre",
    tematica: "Temática 80s",
    zona: "San Telmo",
    barrio: "San Telmo",
    precio: 5000,
    fechaISO: isoDeHoy(1),
    hora: "22:00",
    genero: "Synth-pop / Disco",
    vibe: "Dress code obligatorio, sintetizadores y neón de verdad",
    grad: "linear-gradient(135deg, #8B7FD9 0%, #FF6B4A 60%)",
    organizador: "Sole (Retro Fiebre)",
    telefonos: ["+54 9 11 2233-8899"],
    link: "https://instagram.com/retrofiebre",
  },
  {
    id: 3,
    region: "Zona Sur",
    edadMinima: 21,
    tipo: "Fiesta espontánea",
    ambiente: "Cerrado",
    lat: -34.6345,
    lng: -58.3631,
    flyer: null,
    nombre: "Under del Puerto",
    tematica: "Under / Experimental",
    zona: "La Boca",
    barrio: "La Boca",
    precio: 4000,
    fechaISO: "2026-08-15",
    hora: "00:00",
    genero: "Techno crudo",
    vibe: "Galpón reciclado, cupo limitado, sin flash",
    grad: "linear-gradient(135deg, #2A263D 0%, #6B6580 100%)",
    organizador: "Nano (Under del Puerto)",
    telefonos: ["+54 9 11 5566-1122"],
    link: "https://instagram.com/underdelpuerto",
  },
  {
    id: 4,
    region: "Zona Oeste",
    edadMinima: 16,
    tipo: "Boliche",
    ambiente: "Aire libre",
    flyer: null,
    nombre: "Terraza Cumbia",
    tematica: "Cumbia / Folklore urbano",
    zona: "Villa Crespo",
    barrio: "Villa Crespo",
    precio: 3500,
    fechaISO: "2026-08-14",
    hora: "21:00",
    genero: "Cumbia villera / Digital",
    vibe: "Terraza al aire libre, food trucks, familia bienvenida hasta medianoche",
    grad: "linear-gradient(135deg, #FF6B4A 0%, #F2B78C 120%)",
    organizador: "Vale (Terraza Cumbia)",
    telefonos: ["+54 9 11 7788-3344"],
    link: "https://instagram.com/terrazacumbia",
  },
  {
    id: 5,
    region: "Zona Oeste",
    edadMinima: 18,
    tipo: "Fiesta espontánea",
    ambiente: "Aire libre",
    lat: -34.5852,
    lng: -58.4531,
    flyer: null,
    nombre: "Después de las 6",
    tematica: "After / Día completo",
    zona: "Chacarita",
    barrio: "Chacarita",
    precio: 6000,
    fechaISO: "2026-08-16",
    hora: "06:00",
    genero: "Melodic techno",
    vibe: "Arranca al amanecer, patio con sol, cierre 14hs",
    grad: "linear-gradient(135deg, #8B7FD9 0%, #2A263D 100%)",
    organizador: "Ema (Después de las 6)",
    telefonos: ["+54 9 11 9900-5566", "+54 9 11 1122-3344"],
    link: "https://instagram.com/despuesdelas6",
  },
  {
    id: 6,
    region: "Zona Oeste",
    edadMinima: 18,
    tipo: "Fiesta espontánea",
    ambiente: "Cerrado",
    flyer: null,
    nombre: "Boliche Ficción",
    tematica: "Fiesta literaria / rara",
    zona: "Almagro",
    barrio: "Almagro",
    precio: 4500,
    fechaISO: isoDeHoy(0),
    hora: "21:30",
    genero: "Indie / Post-punk",
    vibe: "DJ sets entre lecturas en vivo, bar de vermú",
    grad: "linear-gradient(135deg, #6B6580 0%, #FF6B4A 100%)",
    organizador: "Cami (Boliche Ficción)",
    telefonos: ["+54 9 11 3344-7788"],
    link: "https://instagram.com/bolicheficcion",
  },
  {
    id: 7,
    region: "Zona Sur",
    edadMinima: 18,
    tipo: "Fiesta espontánea",
    ambiente: "Aire libre",
    lat: -34.8451,
    lng: -58.5161,
    flyer: demoFlyer("6B6580", "Eterna Parish", "Mar 18 Ago"),
    nombre: "Eterna Parish",
    tematica: "Electrónica",
    zona: "Canning",
    barrio: "Canning",
    precio: 25000,
    fechaISO: "2026-08-18",
    hora: "01:30",
    genero: "Guaracha / Reggaetón / RKT",
    vibe: "Carpa, luces, DJs invitados",
    grad: "linear-gradient(135deg, #FF6B4A 0%, #6B6580 100%)",
    organizador: "Organización Eterna Parish",
    telefonos: ["+54 9 11 6677-2233", "+54 9 11 8899-0011"],
    link: "https://instagram.com/parish2k26",
  },
];

const TIPOS = ["Todos", "Boliche", "Fiesta espontánea"];
const AMBIENTES = ["Todos", "Aire libre", "Cerrado"];
const REGIONES = ["Zona Norte", "Zona Sur", "Zona Oeste"];
const BARRIOS_BA = [
  // CABA
  "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo",
  "Caballito", "Chacarita", "Coghlan", "Colegiales", "Constitución",
  "Flores", "Floresta", "La Boca", "La Paternal", "Liniers", "Mataderos",
  "Monte Castro", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda",
  "Parque Chacabuco", "Parque Chas", "Parque Patricios", "Puerto Madero",
  "Recoleta", "Retiro", "Saavedra", "San Cristóbal", "San Nicolás",
  "San Telmo", "Vélez Sarsfield", "Versalles", "Villa Crespo",
  "Villa del Parque", "Villa Devoto", "Villa General Mitre", "Villa Lugano",
  "Villa Luro", "Villa Ortúzar", "Villa Pueyrredón", "Villa Real",
  "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza",
  // Conurbano - Zona Norte
  "Vicente López", "San Isidro", "San Fernando", "Tigre", "Pilar",
  "Escobar", "San Miguel", "José C. Paz", "Malvinas Argentinas",
  "General San Martín", "Tres de Febrero",
  // Conurbano - Zona Oeste
  "Hurlingham", "Ituzaingó", "Morón", "Merlo", "Moreno",
  "General Rodríguez", "Marcos Paz", "La Matanza",
  // Conurbano - Zona Sur
  "Ezeiza", "Esteban Echeverría", "Canning", "Cañuelas", "San Vicente",
  "Almirante Brown", "Lomas de Zamora", "Lanús", "Avellaneda", "Quilmes",
  "Berazategui", "Florencio Varela",
  // Provincia - otras ciudades
  "La Plata", "Berisso", "Ensenada", "Mar del Plata", "Pinamar",
  "Villa Gesell", "San Clemente del Tuyú", "Necochea", "Miramar",
  "Tandil", "Bahía Blanca",
];
const RADIO_CERCA_KM = 15;
const CLAVE_STORAGE = "fiestas-ba:lista";
const GRADIENTES_DEFECTO = [
  "linear-gradient(135deg, #FF6B4A 0%, #8B7FD9 100%)",
  "linear-gradient(135deg, #8B7FD9 0%, #FF6B4A 60%)",
  "linear-gradient(135deg, #2A263D 0%, #6B6580 100%)",
  "linear-gradient(135deg, #FF6B4A 0%, #F2B78C 120%)",
  "linear-gradient(135deg, #8B7FD9 0%, #2A263D 100%)",
  "linear-gradient(135deg, #6B6580 0%, #FF6B4A 100%)",
];

function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function orientacionGrados(lat1, lon1, lat2, lon2) {
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const λ1 = (lon1 * Math.PI) / 180;
  const λ2 = (lon2 * Math.PI) / 180;
  const y = Math.sin(λ2 - λ1) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function demoFlyer(color, nombre, fecha, w = 500, h = 625) {
  // Placeholder de prueba solo para mostrar cómo se vería un flyer real.
  // Cuando subas tu propia foto, el campo `flyer` de cada fiesta pasaría
  // a ser directamente la URL de esa imagen.
  const texto = encodeURIComponent(`${nombre}\n${fecha}`);
  return `https://placehold.co/${w}x${h}/${color}/FFFFFF/png?text=${texto}&font=roboto`;
}

function redimensionarImagen(file, maxAncho = 800, calidad = 0.8) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const escala = Math.min(1, maxAncho / img.width);
        const w = Math.round(img.width * escala);
        const h = Math.round(img.height * escala);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", calidad));
      };
      img.onerror = () => reject(new Error("No se pudo leer la imagen"));
      img.src = e.target.result;
    };
    lector.onerror = () => reject(new Error("No se pudo leer el archivo"));
    lector.readAsDataURL(file);
  });
}

const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
  .font-body { font-family: 'Inter', sans-serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .ticket-notch::before, .ticket-notch::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: #FAF9F6;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
  .ticket-notch::before { left: -10px; }
  .ticket-notch::after { right: -10px; }
`;

function CercaView({ fiestas, userPos, permiso, error, onPedirUbicacion, onVolver, onSeleccionar }) {
  useEffect(() => {
    if (permiso === "inicial") {
      onPedirUbicacion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sinUbicacion = useMemo(
    () => fiestas.filter((f) => f.lat == null || f.lng == null),
    [fiestas]
  );

  const cercanas = useMemo(() => {
    if (!userPos) return [];
    return fiestas
      .filter((f) => f.lat != null && f.lng != null)
      .map((f) => ({
        ...f,
        distancia: distanciaKm(userPos.lat, userPos.lng, f.lat, f.lng),
        angulo: orientacionGrados(userPos.lat, userPos.lng, f.lat, f.lng),
      }))
      .filter((f) => f.distancia <= RADIO_CERCA_KM)
      .sort((a, b) => a.distancia - b.distancia)
      .slice(0, 8);
  }, [fiestas, userPos]);

  const radioMaxKm = Math.max(2, ...cercanas.map((f) => f.distancia), 0.001);
  const MAPA_PX = 320;
  const MAPA_MITAD = MAPA_PX / 2;

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1C1A26]">
      <style>{FONT_STYLES}</style>

      <div className="px-6 pt-14 pb-6 border-b border-[#E8E4DA]">
        <button
          onClick={onVolver}
          className="flex items-center gap-1.5 bg-white border border-[#E8E4DA] px-3 py-2 rounded-full mb-4 hover:border-[#A8A2B8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#1C1A26]" />
          <span className="font-body text-xs font-semibold text-[#1C1A26]">
            Volver
          </span>
        </button>
        <p className="font-mono text-xs tracking-[0.3em] text-[#FF6B4A] uppercase mb-2">
          Cerca de vos
        </p>
        <h1 className="font-display text-5xl leading-[0.9] text-[#1C1A26]">
          FIESTAS EN TU ZONA
        </h1>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        {sinUbicacion.length > 0 && (
          <div className="flex items-start gap-3 bg-[#FFF6E0] border border-[#F0DFA8] rounded-2xl p-4 mb-6">
            <AlertCircle className="w-4 h-4 text-[#B8860B] shrink-0 mt-0.5" />
            <p className="font-body text-xs text-[#6B5A1E] leading-relaxed">
              Hay {sinUbicacion.length === 1 ? "1 fiesta" : `${sinUbicacion.length} fiestas`} que
              también podrían estar cerca tuyo, pero como todavía no cargaron
              su dirección exacta, no se muestran en este mapa.
            </p>
          </div>
        )}

        {permiso !== "concedido" && (
          <div className="bg-white border border-[#E8E4DA] rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#EAE6F7] flex items-center justify-center mx-auto mb-4">
              {permiso === "denegado" ? (
                <AlertCircle className="w-6 h-6 text-[#FF6B4A]" />
              ) : (
                <Loader2 className="w-6 h-6 text-[#8B7FD9] animate-spin" />
              )}
            </div>

            {permiso === "denegado" ? (
              <>
                <p className="font-body text-sm text-[#1C1A26] font-medium mb-1">
                  No pudimos acceder a tu ubicación
                </p>
                <p className="font-body text-xs text-[#6B6580] mb-5">
                  {error ||
                    "Revisá los permisos de ubicación de tu navegador para esta página e intentá de nuevo."}
                </p>
              </>
            ) : (
              <p className="font-body text-sm text-[#6B6580] mb-1">
                Buscando tu ubicación...
              </p>
            )}

            {permiso === "denegado" && (
              <button
                onClick={onPedirUbicacion}
                className="font-body text-sm font-semibold bg-[#1C1A26] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
              >
                Reintentar
              </button>
            )}
          </div>
        )}

        {permiso === "concedido" && cercanas.length === 0 && (
          <div className="text-center py-16">
            <p className="font-display text-3xl text-[#A8A2B8] mb-2">
              NADA CERCA
            </p>
            <p className="font-body text-sm text-[#A8A2B8]">
              No encontramos fiestas a menos de {RADIO_CERCA_KM}km tuyo.
            </p>
          </div>
        )}

        {permiso === "concedido" && cercanas.length > 0 && (
          <>
            <div
              className="relative mx-auto rounded-2xl border border-[#D8D3C4] mb-3 overflow-hidden"
              style={{
                width: MAPA_PX,
                height: MAPA_PX,
                background: "#EAE7DC",
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 34px, #FFFFFF 34px, #FFFFFF 37px), repeating-linear-gradient(90deg, transparent, transparent 34px, #FFFFFF 34px, #FFFFFF 37px)",
              }}
            >
              {/* avenidas principales */}
              <div
                className="absolute bg-[#F4D98B]"
                style={{ top: MAPA_MITAD - 6, left: 0, width: "100%", height: 12 }}
              />
              <div
                className="absolute bg-[#F4D98B]"
                style={{ left: MAPA_MITAD - 6, top: 0, height: "100%", width: 12 }}
              />

              {/* parche verde tipo plaza */}
              <div
                className="absolute rounded-md bg-[#C9E4C5]"
                style={{ width: 54, height: 40, top: 26, left: 24 }}
              />
              {/* parche celeste tipo laguna */}
              <div
                className="absolute rounded-full bg-[#BBDDF5]"
                style={{ width: 46, height: 34, bottom: 30, right: 20 }}
              />

              {/* Usuario, estilo Google Maps */}
              <div
                className="absolute rounded-full bg-[#CFE3FF]"
                style={{
                  width: 34,
                  height: 34,
                  top: MAPA_MITAD - 17,
                  left: MAPA_MITAD - 17,
                }}
              />
              <div
                className="absolute rounded-full bg-[#1A73E8] border-[3px] border-white shadow"
                style={{
                  width: 16,
                  height: 16,
                  top: MAPA_MITAD - 8,
                  left: MAPA_MITAD - 8,
                }}
              />

              {/* Fiestas cercanas, pines tipo Google Maps */}
              {cercanas.map((f) => {
                const radioPx =
                  (f.distancia / radioMaxKm) * (MAPA_MITAD - 34);
                const rad = (f.angulo * Math.PI) / 180;
                const x = MAPA_MITAD + radioPx * Math.sin(rad);
                const y = MAPA_MITAD - radioPx * Math.cos(rad);
                return (
                  <button
                    key={f.id}
                    onClick={() => onSeleccionar(f)}
                    className="absolute flex flex-col items-center group z-10"
                    style={{ left: x, top: y, transform: "translate(-50%, -100%)" }}
                  >
                    <div className="bg-white border border-[#E8E4DA] rounded-lg px-2 py-1 mb-0.5 shadow group-hover:border-[#A8A2B8] transition-colors whitespace-nowrap">
                      <p className="font-body text-[10px] font-semibold text-[#1C1A26] leading-tight">
                        {f.nombre}
                      </p>
                      <p className="font-mono text-[9px] text-[#6B6580] leading-tight">
                        {f.genero}
                      </p>
                      <p className="font-mono text-[9px] text-[#FF6B4A] font-semibold leading-tight">
                        {f.distancia < 1
                          ? `${Math.round(f.distancia * 1000)}m`
                          : `${f.distancia.toFixed(1)}km`}
                      </p>
                    </div>
                    {/* pin tipo Google Maps */}
                    <svg width="22" height="28" viewBox="0 0 22 28" className="drop-shadow">
                      <path
                        d="M11 0C4.9 0 0 4.9 0 11c0 8.25 11 17 11 17s11-8.75 11-17C22 4.9 17.1 0 11 0z"
                        fill="#EA4335"
                      />
                      <circle cx="11" cy="11" r="4.5" fill="#FFFFFF" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest text-center">
              Tocá una fiesta para ver el detalle
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function DetalleFiesta({ fiesta, onVolver }) {
  const todasLasFotos = [fiesta.flyer, ...(fiesta.fotosExtra || [])].filter(
    Boolean
  );
  const [fotoActiva, setFotoActiva] = useState(0);
  const fotoActual = todasLasFotos[fotoActiva] || todasLasFotos[0];

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1C1A26]">
      <style>{FONT_STYLES}</style>

      <div
        className="h-40 w-full flex flex-col justify-between p-4"
        style={{ background: fiesta.grad }}
      >
        <button
          onClick={onVolver}
          className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-full self-start hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4 text-[#1C1A26]" />
          <span className="font-body text-xs font-semibold text-[#1C1A26]">
            Volver
          </span>
        </button>
        <span className="font-mono text-[10px] bg-white px-2 py-1 rounded-full uppercase tracking-wide text-[#1C1A26] self-start">
          {fiesta.tematica}
        </span>
      </div>

      <div className="p-6 max-w-md mx-auto">
        <h2 className="font-display text-4xl leading-none mb-1 text-[#1C1A26]">
          {fiesta.nombre}
        </h2>
        <div className="flex items-center gap-1.5 text-[#6B6580] text-xs font-body mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" />
          {fiesta.barrio} · {formatFechaCorta(fiesta.fechaISO)} · {fiesta.hora}
        </div>

        <p className="font-body text-sm text-[#6B6580] leading-relaxed mb-6">
          {fiesta.vibe}
        </p>

        <div className="mb-6">
          <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest mb-3">
            {todasLasFotos.length > 1 ? "Fotos" : "Flyer"}
          </p>
          {fotoActual ? (
            <img
              src={fotoActual}
              alt={`Foto de ${fiesta.nombre}`}
              className="w-full aspect-[4/5] rounded-2xl border border-[#E8E4DA] object-cover"
            />
          ) : (
            <div
              className="w-full aspect-[4/5] rounded-2xl border border-[#E8E4DA] flex items-center justify-center"
              style={{ background: fiesta.grad }}
            >
              <span className="font-mono text-xs bg-white px-3 py-1.5 rounded-full text-[#1C1A26]">
                Sin flyer cargado
              </span>
            </div>
          )}

          {todasLasFotos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto mt-2 pb-1 -mx-1 px-1">
              {todasLasFotos.map((foto, i) => (
                <button
                  key={i}
                  onClick={() => setFotoActiva(i)}
                  className="shrink-0 w-16 h-16 rounded-lg overflow-hidden"
                  style={{
                    border:
                      i === fotoActiva
                        ? "2px solid #FF6B4A"
                        : "2px solid #E8E4DA",
                  }}
                >
                  <img
                    src={foto}
                    alt={`Miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-[#E8E4DA] rounded-2xl p-5 mb-4">
          <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest mb-3">
            Contacto del organizador
          </p>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-[#EAE6F7] flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-[#8B7FD9]" />
            </div>
            <span className="font-body text-sm text-[#1C1A26] font-medium">
              {fiesta.organizador}
            </span>
          </div>

          {fiesta.link && (
            <a
              href={fiesta.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mb-4 group"
            >
              <div className="w-9 h-9 rounded-full bg-[#EAE6F7] flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4 text-[#8B7FD9]" />
              </div>
              <span className="font-body text-sm text-[#1C1A26] group-hover:underline break-all">
                {fiesta.link.replace(/^https?:\/\//, "")}
              </span>
            </a>
          )}

          {fiesta.telefonos?.map((tel, i) => (
            <div
              key={tel}
              className={`flex items-center justify-between gap-3 ${
                i > 0 ? "mt-3 pt-3 border-t border-[#E8E4DA]" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFE4DA] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#FF6B4A]" />
                </div>
                <span className="font-mono text-sm text-[#1C1A26]">{tel}</span>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://wa.me/${tel.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center bg-[#1C1A26] rounded-full hover:opacity-90 transition-opacity"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                </a>
                <a
                  href={`tel:${tel.replace(/[^0-9+]/g, "")}`}
                  className="w-8 h-8 flex items-center justify-center bg-white border border-[#E8E4DA] rounded-full hover:border-[#A8A2B8] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#1C1A26]" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-[#E8E4DA]">
          <div className="font-mono text-xs text-[#6B6580]">
            <Music className="inline w-3.5 h-3.5 mr-1 -mt-0.5 text-[#8B7FD9]" />
            {fiesta.genero}
          </div>
          <div className="flex items-center gap-1 font-mono text-sm font-semibold text-[#FF6B4A]">
            <Ticket className="w-3.5 h-3.5" />${fiesta.precio.toLocaleString("es-AR")}
          </div>
        </div>
      </div>
    </div>
  );
}

const CAMPOS_VACIOS = {
  nombre: "",
  tematica: "",
  region: "Zona Norte",
  zona: "",
  barrio: "",
  precio: "",
  fechaISO: "",
  hora: "",
  genero: "",
  vibe: "",
  tipo: "Boliche",
  ambiente: "Aire libre",
  edadMinima: "18",
  organizador: "",
  telefonos: "",
  link: "",
  flyer: "",
  fotosExtra: [],
  lat: "",
  lng: "",
};

function FormularioFiesta({ inicial, onGuardar, onCancelar }) {
  const [valores, setValores] = useState(inicial || CAMPOS_VACIOS);
  const [subiendo, setSubiendo] = useState(false);
  const [errorImagen, setErrorImagen] = useState(null);
  const [subiendoExtra, setSubiendoExtra] = useState(false);

  const set = (campo) => (e) =>
    setValores((v) => ({ ...v, [campo]: e.target.value }));

  const handleArchivo = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErrorImagen(null);
    setSubiendo(true);
    try {
      const dataUrl = await redimensionarImagen(file);
      setValores((v) => ({ ...v, flyer: dataUrl }));
    } catch (err) {
      setErrorImagen("No se pudo cargar esa imagen, probá con otra.");
    } finally {
      setSubiendo(false);
    }
  };

  const handleArchivosExtra = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (files.length === 0) return;
    setErrorImagen(null);
    setSubiendoExtra(true);
    try {
      const nuevas = await Promise.all(files.map((f) => redimensionarImagen(f)));
      setValores((v) => ({ ...v, fotosExtra: [...v.fotosExtra, ...nuevas] }));
    } catch (err) {
      setErrorImagen("No se pudieron cargar algunas fotos, probá de nuevo.");
    } finally {
      setSubiendoExtra(false);
    }
  };

  const quitarFotoExtra = (i) => {
    setValores((v) => ({
      ...v,
      fotosExtra: v.fotosExtra.filter((_, idx) => idx !== i),
    }));
  };

  const campoTexto = (campo, label, placeholder, tipo = "text") => (
    <div className="mb-3">
      <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
        {label}
      </label>
      <input
        type={tipo}
        value={valores[campo]}
        onChange={set(campo)}
        placeholder={placeholder}
        className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] placeholder-[#A8A2B8] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
      />
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valores.nombre || !valores.zona || !valores.fechaISO) {
      alert("Completá al menos nombre, zona y fecha.");
      return;
    }
    onGuardar(valores);
  };

  return (
    <form onSubmit={handleSubmit} className="pb-4">
      {campoTexto("nombre", "Nombre de la fiesta", "Ej: Neón Sur")}
      {campoTexto("tematica", "Temática", "Ej: Electrónica, Under, Egresados...")}

      <div className="mb-3">
        <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
          Región
        </label>
        <select
          value={valores.region}
          onChange={set("region")}
          className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
        >
          {REGIONES.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {campoTexto("zona", "Localidad / barrio", "Ej: Palermo")}
      {campoTexto("barrio", "Barrio / dirección aprox.", "Ej: Palermo Soho")}
      {campoTexto("precio", "Precio", "Ej: 8000", "number")}
      {campoTexto("fechaISO", "Fecha", "", "date")}
      {campoTexto("hora", "Hora", "Ej: 23:30")}
      {campoTexto("genero", "Género musical", "Ej: Techno / House")}

      <div className="mb-3">
        <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
          Descripción / vibe
        </label>
        <textarea
          value={valores.vibe}
          onChange={set("vibe")}
          rows={2}
          placeholder="Ej: Rooftop, luces láser, línea hasta las 6am"
          className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] placeholder-[#A8A2B8] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
            Tipo
          </label>
          <select
            value={valores.tipo}
            onChange={set("tipo")}
            className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
          >
            <option>Boliche</option>
            <option>Fiesta espontánea</option>
          </select>
        </div>
        <div>
          <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
            Ambiente
          </label>
          <select
            value={valores.ambiente}
            onChange={set("ambiente")}
            className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
          >
            <option>Aire libre</option>
            <option>Cerrado</option>
          </select>
        </div>
      </div>

      {campoTexto("edadMinima", "Edad mínima", "Ej: 18", "number")}
      {campoTexto("organizador", "Nombre del organizador", "Ej: Facu (Neón Sur)")}
      {campoTexto(
        "telefonos",
        "Teléfono(s) — separados por coma si hay más de uno",
        "Ej: +54 9 11 1234-5678, +54 9 11 8765-4321"
      )}
      {campoTexto("link", "Link (Instagram / web)", "https://instagram.com/...")}

      <div className="mb-3">
        <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
          Flyer (opcional)
        </label>

        {valores.flyer ? (
          <div className="flex items-center gap-3 bg-white border border-[#E8E4DA] rounded-xl p-3">
            <img
              src={valores.flyer}
              alt="Flyer cargado"
              className="w-16 h-20 rounded-lg object-cover shrink-0"
            />
            <div className="flex flex-col gap-2 flex-1">
              <label
                htmlFor="input-flyer"
                className="font-body text-xs font-semibold text-[#1C1A26] bg-[#EAE6F7] text-center py-2 rounded-full cursor-pointer hover:opacity-90 transition-opacity"
              >
                Cambiar imagen
              </label>
              <button
                type="button"
                onClick={() => setValores((v) => ({ ...v, flyer: "" }))}
                className="font-body text-xs font-semibold text-[#FF6B4A] bg-[#FFE4DA] py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <label
            htmlFor="input-flyer"
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#E8E4DA] rounded-xl py-6 cursor-pointer hover:border-[#A8A2B8] transition-colors"
          >
            {subiendo ? (
              <>
                <Loader2 className="w-5 h-5 text-[#8B7FD9] animate-spin" />
                <span className="font-body text-xs text-[#6B6580]">
                  Procesando imagen...
                </span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 text-[#8B7FD9]" />
                <span className="font-body text-xs text-[#6B6580]">
                  Tocá para subir una foto
                </span>
              </>
            )}
          </label>
        )}

        <input
          id="input-flyer"
          type="file"
          accept="image/*"
          onChange={handleArchivo}
          className="hidden"
        />

        {errorImagen && (
          <p className="font-body text-xs text-[#FF6B4A] mt-2">{errorImagen}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest block mb-1">
          Fotos adicionales (opcional)
        </label>
        <p className="font-body text-[10px] text-[#A8A2B8] mb-2 leading-relaxed">
          Se muestran junto al flyer, en la ficha de la fiesta.
        </p>

        {valores.fotosExtra.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-2">
            {valores.fotosExtra.map((foto, i) => (
              <div key={i} className="relative w-16 h-16">
                <img
                  src={foto}
                  alt={`Foto extra ${i + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => quitarFotoExtra(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-[#FF6B4A] rounded-full"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        <label
          htmlFor="input-fotos-extra"
          className="flex items-center justify-center gap-2 border-2 border-dashed border-[#E8E4DA] rounded-xl py-3 cursor-pointer hover:border-[#A8A2B8] transition-colors"
        >
          {subiendoExtra ? (
            <>
              <Loader2 className="w-4 h-4 text-[#8B7FD9] animate-spin" />
              <span className="font-body text-xs text-[#6B6580]">
                Procesando fotos...
              </span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 text-[#8B7FD9]" />
              <span className="font-body text-xs text-[#6B6580]">
                Agregar más fotos
              </span>
            </>
          )}
        </label>
        <input
          id="input-fotos-extra"
          type="file"
          accept="image/*"
          multiple
          onChange={handleArchivosExtra}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-1">
        {campoTexto("lat", "Latitud (opcional)", "Ej: -34.5885", "number")}
        {campoTexto("lng", "Longitud (opcional)", "Ej: -58.4306", "number")}
      </div>
      <p className="font-body text-[10px] text-[#A8A2B8] mb-4 leading-relaxed">
        Sin latitud/longitud, la fiesta no va a aparecer en el mapa de "Cerca
        de mí" — pero sí en el resto de la app.
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancelar}
          className="flex-1 font-body text-sm font-semibold bg-white border border-[#E8E4DA] text-[#1C1A26] py-3 rounded-full hover:border-[#A8A2B8] transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={subiendo}
          className="flex-1 flex items-center justify-center gap-2 font-body text-sm font-semibold bg-[#1C1A26] text-white py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Guardar
        </button>
      </div>
    </form>
  );
}

function AdminView({ fiestas, onGuardarLista, onVolver }) {
  const [modo, setModo] = useState("lista"); // lista | nueva | editar
  const [editando, setEditando] = useState(null);
  const [guardado, setGuardado] = useState(false);

  const avisarGuardado = () => {
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2000);
  };

  const valoresDesdeForm = (v) => ({
    nombre: v.nombre.trim(),
    tematica: v.tematica.trim() || "General",
    region: v.region,
    zona: v.zona.trim(),
    barrio: v.barrio.trim() || v.zona.trim(),
    precio: Number(v.precio) || 0,
    fechaISO: v.fechaISO,
    hora: v.hora.trim(),
    genero: v.genero.trim(),
    vibe: v.vibe.trim(),
    tipo: v.tipo,
    ambiente: v.ambiente,
    edadMinima: Number(v.edadMinima) || 18,
    organizador: v.organizador.trim(),
    telefonos: v.telefonos
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    link: v.link.trim() || null,
    flyer: v.flyer.trim() || null,
    fotosExtra: v.fotosExtra,
    lat: v.lat !== "" ? Number(v.lat) : null,
    lng: v.lng !== "" ? Number(v.lng) : null,
  });

  const crearFiesta = (v) => {
    const nueva = {
      id: Date.now(),
      grad: GRADIENTES_DEFECTO[fiestas.length % GRADIENTES_DEFECTO.length],
      ...valoresDesdeForm(v),
    };
    onGuardarLista([...fiestas, nueva]);
    setModo("lista");
    avisarGuardado();
  };

  const actualizarFiesta = (v) => {
    const actualizada = { ...editando, ...valoresDesdeForm(v) };
    onGuardarLista(
      fiestas.map((f) => (f.id === editando.id ? actualizada : f))
    );
    setModo("lista");
    setEditando(null);
    avisarGuardado();
  };

  const eliminarFiesta = (f) => {
    if (!confirm(`¿Eliminar "${f.nombre}"? No se puede deshacer.`)) return;
    onGuardarLista(fiestas.filter((x) => x.id !== f.id));
    avisarGuardado();
  };

  const abrirEdicion = (f) => {
    setEditando(f);
    setModo("editar");
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1C1A26]">
      <style>{FONT_STYLES}</style>

      <div className="px-6 pt-14 pb-6 border-b border-[#E8E4DA]">
        <button
          onClick={
            modo === "lista" ? onVolver : () => setModo("lista")
          }
          className="flex items-center gap-1.5 bg-white border border-[#E8E4DA] px-3 py-2 rounded-full mb-4 hover:border-[#A8A2B8] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#1C1A26]" />
          <span className="font-body text-xs font-semibold text-[#1C1A26]">
            {modo === "lista" ? "Volver a la app" : "Volver a la lista"}
          </span>
        </button>
        <p className="font-mono text-xs tracking-[0.3em] text-[#FF6B4A] uppercase mb-2">
          Panel de carga
        </p>
        <h1 className="font-display text-5xl leading-[0.9] text-[#1C1A26]">
          {modo === "lista"
            ? "TUS FIESTAS"
            : modo === "nueva"
            ? "NUEVA FIESTA"
            : "EDITAR FIESTA"}
        </h1>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto">
        {guardado && (
          <div className="flex items-center gap-2 bg-[#E7F5E8] border border-[#BEE0C0] rounded-xl p-3 mb-5">
            <CheckCircle2 className="w-4 h-4 text-[#3E8E45]" />
            <p className="font-body text-xs text-[#3E8E45] font-medium">
              Cambios guardados
            </p>
          </div>
        )}

        {modo === "lista" && (
          <>
            <button
              onClick={() => setModo("nueva")}
              className="w-full flex items-center justify-center gap-2 bg-[#1C1A26] text-white font-body text-sm font-semibold py-3 rounded-full mb-6 hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Nueva fiesta
            </button>

            {fiestas.length === 0 && (
              <p className="font-body text-sm text-[#A8A2B8] text-center py-10">
                Todavía no cargaste ninguna fiesta.
              </p>
            )}

            <div className="flex flex-col gap-3">
              {fiestas.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center gap-3 bg-white border border-[#E8E4DA] rounded-2xl p-3"
                >
                  <div
                    className="w-12 h-12 rounded-xl shrink-0"
                    style={
                      f.flyer
                        ? {
                            backgroundImage: `url(${f.flyer})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : { background: f.grad }
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-[#1C1A26] truncate">
                      {f.nombre}
                    </p>
                    <p className="font-mono text-[10px] text-[#A8A2B8] truncate">
                      {f.zona} · {formatFechaCorta(f.fechaISO)}
                    </p>
                  </div>
                  <button
                    onClick={() => abrirEdicion(f)}
                    className="w-8 h-8 flex items-center justify-center bg-[#EAE6F7] rounded-full shrink-0"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#8B7FD9]" />
                  </button>
                  <button
                    onClick={() => eliminarFiesta(f)}
                    className="w-8 h-8 flex items-center justify-center bg-[#FFE4DA] rounded-full shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {modo === "nueva" && (
          <FormularioFiesta
            onGuardar={crearFiesta}
            onCancelar={() => setModo("lista")}
          />
        )}

        {modo === "editar" && editando && (
          <FormularioFiesta
            inicial={{
              nombre: editando.nombre || "",
              tematica: editando.tematica || "",
              region: editando.region || "Zona Norte",
              zona: editando.zona || "",
              barrio: editando.barrio || "",
              precio: String(editando.precio ?? ""),
              fechaISO: editando.fechaISO || "",
              hora: editando.hora || "",
              genero: editando.genero || "",
              vibe: editando.vibe || "",
              tipo: editando.tipo || "Boliche",
              ambiente: editando.ambiente || "Aire libre",
              edadMinima: String(editando.edadMinima ?? "18"),
              organizador: editando.organizador || "",
              telefonos: (editando.telefonos || []).join(", "),
              link: editando.link || "",
              flyer: editando.flyer || "",
              fotosExtra: editando.fotosExtra || [],
              lat: editando.lat != null ? String(editando.lat) : "",
              lng: editando.lng != null ? String(editando.lng) : "",
            }}
            onGuardar={actualizarFiesta}
            onCancelar={() => {
              setModo("lista");
              setEditando(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default function FiestasBA() {
  const [filtroRegion, setFiltroRegion] = useState("Todas");
  const [localidadElegida, setLocalidadElegida] = useState("");
  const [tematica, setTematica] = useState("Todas");
  const [tipo, setTipo] = useState("Todos");
  const [ambiente, setAmbiente] = useState("Todos");
  const [precioMax, setPrecioMax] = useState(100000);
  const [edadMax, setEdadMax] = useState(99);
  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("todas");
  const [fechaPersonalizada, setFechaPersonalizada] = useState("");
  const [mostrarSelectorFecha, setMostrarSelectorFecha] = useState(false);
  const [mostrarMasFiltros, setMostrarMasFiltros] = useState(false);
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarCerca, setMostrarCerca] = useState(false);
  const [permisoUbicacion, setPermisoUbicacion] = useState("inicial");
  const [userPos, setUserPos] = useState(null);
  const [errorUbicacion, setErrorUbicacion] = useState(null);
  const [fiestas, setFiestas] = useState(FIESTAS_SEED);
  const [cargandoDatos, setCargandoDatos] = useState(true);
  const [mostrarAdmin, setMostrarAdmin] = useState(false);
  const editoManualmente = useRef(false);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      try {
        const res = await window.storage.get(CLAVE_STORAGE, true);
        if (!cancelado && !editoManualmente.current && res?.value) {
          setFiestas(JSON.parse(res.value));
        }
      } catch (e) {
        // Todavía no hay datos guardados: seguimos con la lista inicial.
      } finally {
        if (!cancelado) setCargandoDatos(false);
      }
    })();
    return () => {
      cancelado = true;
    };
  }, []);

  const guardarLista = async (nuevaLista) => {
    editoManualmente.current = true;
    setFiestas(nuevaLista);
    try {
      await window.storage.set(CLAVE_STORAGE, JSON.stringify(nuevaLista), true);
    } catch (e) {
      alert("No se pudo guardar. Probá de nuevo.");
    }
  };

  const LOCALIDADES = useMemo(
    () =>
      [...new Set([...BARRIOS_BA, ...fiestas.map((f) => f.zona)])].sort(
        (a, b) => a.localeCompare(b, "es")
      ),
    [fiestas]
  );
  const TEMATICAS = useMemo(
    () => ["Todas", ...new Set(fiestas.map((f) => f.tematica))],
    [fiestas]
  );

  const pedirUbicacion = () => {
    if (!navigator.geolocation) {
      setPermisoUbicacion("denegado");
      setErrorUbicacion("Tu navegador no soporta geolocalización.");
      return;
    }
    setPermisoUbicacion("cargando");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setPermisoUbicacion("concedido");
        setErrorUbicacion(null);
      },
      (err) => {
        setPermisoUbicacion("denegado");
        setErrorUbicacion(
          err.code === 1
            ? "Rechazaste el permiso de ubicación."
            : "No pudimos obtener tu ubicación."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const filtradas = useMemo(() => {
    return fiestas.filter((f) => {
      if (filtroRegion === "localidad") {
        if (localidadElegida && f.zona !== localidadElegida) return false;
      } else if (filtroRegion !== "Todas" && f.region !== filtroRegion) {
        return false;
      }
      if (tematica !== "Todas" && f.tematica !== tematica) return false;
      if (tipo !== "Todos" && f.tipo !== tipo) return false;
      if (ambiente !== "Todos" && f.ambiente !== ambiente) return false;
      if (f.precio > precioMax) return false;
      if (f.edadMinima > edadMax) return false;
      if (filtroFecha === "hoy" && f.fechaISO !== isoDeHoy(0)) return false;
      if (filtroFecha === "manana" && f.fechaISO !== isoDeHoy(1)) return false;
      if (
        filtroFecha === "personalizada" &&
        fechaPersonalizada &&
        f.fechaISO !== fechaPersonalizada
      )
        return false;
      if (
        busqueda &&
        !`${f.nombre} ${f.tematica} ${f.genero} ${f.barrio} ${formatFechaCorta(
          f.fechaISO
        )}`
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      )
        return false;
      return true;
    });
  }, [
    filtroRegion,
    localidadElegida,
    tematica,
    tipo,
    ambiente,
    precioMax,
    edadMax,
    busqueda,
    filtroFecha,
    fechaPersonalizada,
  ]);

  const hayFiltrosSecundarios =
    filtroRegion !== "Todas" ||
    tematica !== "Todas" ||
    tipo !== "Todos" ||
    ambiente !== "Todos" ||
    precioMax !== 100000 ||
    edadMax !== 99;

  if (cargandoDatos) {
    return (
      <div className="min-h-screen w-full bg-[#FAF9F6] flex items-center justify-center">
        <style>{FONT_STYLES}</style>
        <Loader2 className="w-6 h-6 text-[#8B7FD9] animate-spin" />
      </div>
    );
  }

  if (seleccionada) {
    return (
      <DetalleFiesta
        fiesta={seleccionada}
        onVolver={() => setSeleccionada(null)}
      />
    );
  }

  if (mostrarAdmin) {
    return (
      <AdminView
        fiestas={fiestas}
        onGuardarLista={guardarLista}
        onVolver={() => setMostrarAdmin(false)}
      />
    );
  }

  if (mostrarCerca) {
    return (
      <CercaView
        fiestas={fiestas}
        userPos={userPos}
        permiso={permisoUbicacion}
        error={errorUbicacion}
        onPedirUbicacion={pedirUbicacion}
        onVolver={() => setMostrarCerca(false)}
        onSeleccionar={setSeleccionada}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAF9F6] text-[#1C1A26]">
      <style>{FONT_STYLES}</style>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#E8E4DA] px-6 pt-14 pb-10">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full"
          style={{ background: "#FFE4DA" }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full"
          style={{ background: "#EAE6F7" }}
        />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.3em] text-[#FF6B4A] uppercase mb-2">
            Buenos Aires · esta semana
          </p>
          <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] mb-3 text-[#1C1A26]">
            VIVAMOS EL MOMENTO
            <br />
            ¿A DÓNDE VAMOS?
          </h1>
          <p className="font-body text-[#6B6580] max-w-md text-sm leading-relaxed mb-5">
            Boliches, Fiestas under, Al aire libre, Fiestas de egresados,
            Eternas, Todos los géneros, etc.
          </p>
          <button
            onClick={() => setMostrarCerca(true)}
            className="w-full flex items-center gap-4 text-white p-5 rounded-2xl hover:opacity-95 active:scale-[0.99] transition-all shadow-lg"
            style={{ background: "linear-gradient(135deg, #FF6B4A 0%, #8B7FD9 100%)" }}
          >
            <span className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#FFD9CC] shrink-0">
              <Compass className="w-6 h-6 text-[#FF6B4A] relative" />
            </span>
            <span className="text-left">
              <span className="block font-display text-3xl leading-none mb-0.5">
                CERCA DE MÍ
              </span>
              <span className="block font-body text-xs text-[#FDF0EC]">
                Descubrí las fiestas más cercanas a tu ubicación
              </span>
            </span>
          </button>
        </div>
      </header>

      {/* Filtros - estáticos, no molestan al scrollear */}
      <div className="px-6 py-5 border-b border-[#E8E4DA] bg-[#FAF9F6]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A2B8]" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, género, barrio..."
            className="font-body w-full bg-white border border-[#E8E4DA] rounded-full py-2.5 pl-10 pr-4 text-sm text-[#1C1A26] placeholder-[#A8A2B8] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9] focus:border-transparent"
          />
        </div>

        {/* Fecha: lo más importante para una app pensada para la espontaneidad */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {[
            { key: "todas", label: "Todas" },
            { key: "hoy", label: "Hoy" },
            { key: "manana", label: "Mañana" },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => {
                setFiltroFecha(opt.key);
                setMostrarSelectorFecha(false);
              }}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                filtroFecha === opt.key
                  ? "bg-[#FF6B4A] border-[#FF6B4A] text-white font-semibold"
                  : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
              }`}
            >
              {opt.label}
            </button>
          ))}
          <button
            onClick={() => setMostrarSelectorFecha((v) => !v)}
            className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
              filtroFecha === "personalizada"
                ? "bg-[#FF6B4A] border-[#FF6B4A] text-white font-semibold"
                : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
            }`}
          >
            {filtroFecha === "personalizada" && fechaPersonalizada
              ? formatFechaCorta(fechaPersonalizada)
              : "Elegir fecha"}
          </button>
        </div>

        {mostrarSelectorFecha && (
          <input
            type="date"
            value={fechaPersonalizada}
            onChange={(e) => {
              setFechaPersonalizada(e.target.value);
              setFiltroFecha("personalizada");
            }}
            className="font-body mt-2 bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
          />
        )}

        <button
          onClick={() => setMostrarMasFiltros((v) => !v)}
          className="flex items-center gap-1.5 font-mono text-xs text-[#6B6580] mt-4 hover:text-[#1C1A26] transition-colors"
        >
          {mostrarMasFiltros ? "Menos filtros" : "Más filtros"}
          {hayFiltrosSecundarios && !mostrarMasFiltros && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B4A]" />
          )}
        </button>

        {mostrarMasFiltros && (
          <div className="mt-3">
            <div className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-1 px-1">
              <button
                onClick={() => {
                  setFiltroRegion("Todas");
                  setLocalidadElegida("");
                }}
                className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                  filtroRegion === "Todas"
                    ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                    : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                }`}
              >
                <MapPin className="inline w-3 h-3 mr-1 -mt-0.5" />
                Todas
              </button>
              {REGIONES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setFiltroRegion(
                      filtroRegion === r ? "Todas" : r
                    );
                    setLocalidadElegida("");
                  }}
                  className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                    filtroRegion === r
                      ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                      : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                  }`}
                >
                  {r}
                </button>
              ))}
              <button
                onClick={() =>
                  setFiltroRegion(
                    filtroRegion === "localidad" ? "Todas" : "localidad"
                  )
                }
                className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                  filtroRegion === "localidad"
                    ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                    : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                }`}
              >
                Elegir localidad
              </button>
            </div>

            {filtroRegion === "localidad" && (
              <select
                value={localidadElegida}
                onChange={(e) => setLocalidadElegida(e.target.value)}
                className="font-body w-full bg-white border border-[#E8E4DA] rounded-xl py-2 px-3 text-sm text-[#1C1A26] mb-3 focus:outline-none focus:ring-2 focus:ring-[#8B7FD9]"
              >
                <option value="">Todas las localidades</option>
                {LOCALIDADES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            )}

            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
              {TEMATICAS.map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    setTematica(tematica === t && t !== "Todas" ? "Todas" : t)
                  }
                  className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                    tematica === t
                      ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                      : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                  }`}
                >
                  <Sparkles className="inline w-3 h-3 mr-1 -mt-0.5" />
                  {t}
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
              {TIPOS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTipo(tipo === t && t !== "Todos" ? "Todos" : t)}
                  className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                    tipo === t
                      ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                      : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
              {AMBIENTES.map((a) => (
                <button
                  key={a}
                  onClick={() =>
                    setAmbiente(ambiente === a && a !== "Todos" ? "Todos" : a)
                  }
                  className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                    ambiente === a
                      ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                      : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span className="font-mono text-xs text-[#A8A2B8] whitespace-nowrap">
                hasta ${precioMax.toLocaleString("es-AR")}
              </span>
              <input
                type="range"
                min="3000"
                max="100000"
                step="500"
                value={precioMax}
                onChange={(e) => setPrecioMax(Number(e.target.value))}
                className="w-full accent-[#FF6B4A]"
              />
            </div>

            <div className="flex items-center gap-3 mt-3">
              <span className="font-mono text-xs text-[#A8A2B8] whitespace-nowrap">
                edad: {edadMax} años
              </span>
              <input
                type="range"
                min="18"
                max="99"
                step="1"
                value={edadMax}
                onChange={(e) => setEdadMax(Number(e.target.value))}
                className="w-full accent-[#8B7FD9]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Resultados */}
      <main className="px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <p className="font-mono text-xs text-[#A8A2B8] uppercase tracking-wider">
            {filtradas.length} fiesta{filtradas.length !== 1 ? "s" : ""} encontrada
            {filtradas.length !== 1 ? "s" : ""}
          </p>
          {(filtroRegion !== "Todas" ||
            tematica !== "Todas" ||
            tipo !== "Todos" ||
            ambiente !== "Todos" ||
            busqueda ||
            precioMax !== 100000 ||
            edadMax !== 99 ||
            filtroFecha !== "todas") && (
            <button
              onClick={() => {
                setFiltroRegion("Todas");
                setLocalidadElegida("");
                setTematica("Todas");
                setTipo("Todos");
                setAmbiente("Todos");
                setBusqueda("");
                setPrecioMax(100000);
                setEdadMax(99);
                setFiltroFecha("todas");
                setFechaPersonalizada("");
                setMostrarSelectorFecha(false);
              }}
              className="font-mono text-xs text-[#FF6B4A] flex items-center gap-1"
            >
              <X className="w-3 h-3" /> limpiar
            </button>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {filtradas.map((f) => (
            <article
              key={f.id}
              onClick={() => setSeleccionada(f)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSeleccionada(f)}
              className="relative bg-white border border-[#E8E4DA] rounded-2xl overflow-hidden hover:border-[#A8A2B8] hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative h-40 w-full">
                {f.flyer ? (
                  <img
                    src={f.flyer}
                    alt={`Flyer de ${f.nombre}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: f.grad }}
                  />
                )}
                <span className="absolute bottom-3 left-3 font-mono text-[10px] bg-white px-2 py-1 rounded-full uppercase tracking-wide text-[#1C1A26]">
                  {f.tematica}
                </span>
              </div>

              <div className="relative p-5 ticket-notch">
                <div className="border-t border-dashed border-[#E8E4DA] absolute -top-px left-4 right-4" />
                <h3 className="font-display text-3xl leading-none mb-2 mt-2 text-[#1C1A26]">
                  {f.nombre}
                </h3>

                <div className="flex items-center gap-1.5 text-[#6B6580] text-xs font-body mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" />
                  {f.barrio}
                </div>
                <div className="flex items-center gap-1.5 text-[#6B6580] text-xs font-body mb-1">
                  <Music className="w-3.5 h-3.5 text-[#8B7FD9]" />
                  {f.genero}
                </div>
                <p className="font-body text-xs text-[#A8A2B8] mt-2 mb-4 leading-relaxed">
                  {f.vibe}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#E8E4DA]">
                  <div className="font-mono text-xs text-[#6B6580]">
                    {formatFechaCorta(f.fechaISO)} · {f.hora}
                  </div>
                  <div className="flex items-center gap-1 font-mono text-sm font-semibold text-[#FF6B4A]">
                    <Ticket className="w-3.5 h-3.5" />${f.precio.toLocaleString("es-AR")}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtradas.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-[#A8A2B8] mb-2">
              NADA POR ACÁ
            </p>
            <p className="font-body text-sm text-[#A8A2B8]">
              Probá otra zona, temática o subí el precio máximo.
            </p>
          </div>
        )}
      </main>

      <footer className="px-6 py-8 border-t border-[#E8E4DA] text-center">
        <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest mb-4">
          Cargado a mano · Buenos Aires · versión de prueba
        </p>
        <button
          onClick={() => setMostrarAdmin(true)}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#6B6580] uppercase tracking-widest hover:text-[#1C1A26] transition-colors"
        >
          <Settings className="w-3 h-3" />
          Cargar / editar fiestas
        </button>
      </footer>
    </div>
  );
}