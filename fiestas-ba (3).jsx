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
} from "lucide-react";

const FIESTAS = [
  {
    id: 1,
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
    fecha: "Sáb 15 Ago",
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
    fecha: "Vie 14 Ago",
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
    fecha: "Sáb 15 Ago",
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
    tipo: "Boliche",
    ambiente: "Aire libre",
    flyer: null,
    nombre: "Terraza Cumbia",
    tematica: "Cumbia / Folklore urbano",
    zona: "Villa Crespo",
    barrio: "Villa Crespo",
    precio: 3500,
    fecha: "Vie 14 Ago",
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
    fecha: "Dom 16 Ago",
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
    tipo: "Fiesta espontánea",
    ambiente: "Cerrado",
    flyer: null,
    nombre: "Boliche Ficción",
    tematica: "Fiesta literaria / rara",
    zona: "Almagro",
    barrio: "Almagro",
    precio: 4500,
    fecha: "Jue 13 Ago",
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
    fecha: "Mar 18 Ago",
    hora: "01:30",
    genero: "Guaracha / Reggaetón / RKT",
    vibe: "Carpa, luces, DJs invitados",
    grad: "linear-gradient(135deg, #FF6B4A 0%, #6B6580 100%)",
    organizador: "Organización Eterna Parish",
    telefonos: ["+54 9 11 6677-2233", "+54 9 11 8899-0011"],
    link: "https://instagram.com/parish2k26",
  },
];

const ZONAS = ["Todas", ...new Set(FIESTAS.map((f) => f.zona))];
const TEMATICAS = ["Todas", ...new Set(FIESTAS.map((f) => f.tematica))];
const TIPOS = ["Todos", "Boliche", "Fiesta espontánea"];
const AMBIENTES = ["Todos", "Aire libre", "Cerrado"];
const RADIO_CERCA_KM = 15;

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
  const anillos = [0.34, 0.67, 1].map((f) => ({
    frac: f,
    km: radioMaxKm * f,
  }));
  const RADIO_PX = 150;

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
              className="relative mx-auto rounded-full bg-white border border-[#E8E4DA] mb-8"
              style={{ width: RADIO_PX * 2, height: RADIO_PX * 2 }}
            >
              {anillos.map((a) => (
                <div
                  key={a.frac}
                  className="absolute rounded-full border border-dashed border-[#E8E4DA]"
                  style={{
                    width: RADIO_PX * 2 * a.frac,
                    height: RADIO_PX * 2 * a.frac,
                    top: RADIO_PX * (1 - a.frac),
                    left: RADIO_PX * (1 - a.frac),
                  }}
                />
              ))}
              {anillos.map((a) => (
                <span
                  key={`label-${a.frac}`}
                  className="absolute font-mono text-[9px] text-[#A8A2B8] bg-white px-1"
                  style={{
                    top: RADIO_PX * (1 - a.frac) - 6,
                    left: RADIO_PX + 4,
                  }}
                >
                  {a.km < 1 ? `${Math.round(a.km * 1000)}m` : `${a.km.toFixed(1)}km`}
                </span>
              ))}

              {/* Usuario */}
              <div
                className="absolute w-4 h-4 rounded-full bg-[#8B7FD9] border-2 border-white shadow"
                style={{
                  top: RADIO_PX - 8,
                  left: RADIO_PX - 8,
                }}
              />
              <span
                className="absolute font-mono text-[9px] text-[#8B7FD9] font-semibold"
                style={{ top: RADIO_PX + 10, left: RADIO_PX - 14 }}
              >
                VOS
              </span>

              {/* Fiestas cercanas */}
              {cercanas.map((f) => {
                const radioPx = (f.distancia / radioMaxKm) * (RADIO_PX - 20);
                const rad = (f.angulo * Math.PI) / 180;
                const x = RADIO_PX + radioPx * Math.sin(rad);
                const y = RADIO_PX - radioPx * Math.cos(rad);
                return (
                  <button
                    key={f.id}
                    onClick={() => onSeleccionar(f)}
                    className="absolute flex flex-col items-center group"
                    style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
                  >
                    <div className="bg-white border border-[#E8E4DA] rounded-xl px-2 py-1.5 mb-1.5 shadow-sm group-hover:border-[#A8A2B8] transition-colors whitespace-nowrap">
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
                    <span className="w-3 h-3 rounded-full bg-[#FF3B30] border-2 border-white shadow" />
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
          {fiesta.barrio} · {fiesta.fecha} · {fiesta.hora}
        </div>

        <p className="font-body text-sm text-[#6B6580] leading-relaxed mb-6">
          {fiesta.vibe}
        </p>

        <div className="mb-6">
          <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest mb-3">
            Flyer
          </p>
          {fiesta.flyer ? (
            <img
              src={fiesta.flyer}
              alt={`Flyer de ${fiesta.nombre}`}
              className="w-full rounded-2xl border border-[#E8E4DA] object-cover"
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

export default function FiestasBA() {
  const [zona, setZona] = useState("Todas");
  const [tematica, setTematica] = useState("Todas");
  const [tipo, setTipo] = useState("Todos");
  const [ambiente, setAmbiente] = useState("Todos");
  const [precioMax, setPrecioMax] = useState(40000);
  const [busqueda, setBusqueda] = useState("");
  const [seleccionada, setSeleccionada] = useState(null);
  const [mostrarCerca, setMostrarCerca] = useState(false);
  const [permisoUbicacion, setPermisoUbicacion] = useState("inicial");
  const [userPos, setUserPos] = useState(null);
  const [errorUbicacion, setErrorUbicacion] = useState(null);

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
    return FIESTAS.filter((f) => {
      if (zona !== "Todas" && f.zona !== zona) return false;
      if (tematica !== "Todas" && f.tematica !== tematica) return false;
      if (tipo !== "Todos" && f.tipo !== tipo) return false;
      if (ambiente !== "Todos" && f.ambiente !== ambiente) return false;
      if (f.precio > precioMax) return false;
      if (
        busqueda &&
        !`${f.nombre} ${f.tematica} ${f.genero} ${f.barrio}`
          .toLowerCase()
          .includes(busqueda.toLowerCase())
      )
        return false;
      return true;
    });
  }, [zona, tematica, tipo, ambiente, precioMax, busqueda]);

  if (seleccionada) {
    return (
      <DetalleFiesta
        fiesta={seleccionada}
        onVolver={() => setSeleccionada(null)}
      />
    );
  }

  if (mostrarCerca) {
    return (
      <CercaView
        fiestas={FIESTAS}
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

        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1">
          {ZONAS.map((z) => (
            <button
              key={z}
              onClick={() => setZona(zona === z && z !== "Todas" ? "Todas" : z)}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
                zona === z
                  ? "bg-[#6B6580] border-[#6B6580] text-white font-semibold"
                  : "bg-white border-[#E8E4DA] text-[#6B6580] hover:border-[#A8A2B8]"
              }`}
            >
              <MapPin className="inline w-3 h-3 mr-1 -mt-0.5" />
              {z}
            </button>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
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
            max="40000"
            step="500"
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
            className="w-full accent-[#FF6B4A]"
          />
        </div>
      </div>

      {/* Resultados */}
      <main className="px-6 py-8">
        <div className="flex items-baseline justify-between mb-5">
          <p className="font-mono text-xs text-[#A8A2B8] uppercase tracking-wider">
            {filtradas.length} fiesta{filtradas.length !== 1 ? "s" : ""} encontrada
            {filtradas.length !== 1 ? "s" : ""}
          </p>
          {(zona !== "Todas" ||
            tematica !== "Todas" ||
            tipo !== "Todos" ||
            ambiente !== "Todos" ||
            busqueda ||
            precioMax !== 40000) && (
            <button
              onClick={() => {
                setZona("Todas");
                setTematica("Todas");
                setTipo("Todos");
                setAmbiente("Todos");
                setBusqueda("");
                setPrecioMax(40000);
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
                    {f.fecha} · {f.hora}
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
        <p className="font-mono text-[10px] text-[#A8A2B8] uppercase tracking-widest">
          Cargado a mano · Buenos Aires · versión de prueba
        </p>
      </footer>
    </div>
  );
}
