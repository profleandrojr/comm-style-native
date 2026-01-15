// Static Image Mapping
export const RESULT_IMAGES: Record<string, any> = {
  red: require("../assets/images/red.png"),
  blue: require("../assets/images/blue.png"),
  green: require("../assets/images/green.png"),
  rainbow: require("../assets/images/rainbow.png"),
};

// The Content Logic (Now in Spanish 🇪🇸)
export const RESULT_CONTENT: Record<string, any> = {
  red: {
    title: "Jerárquico (Rojo)",
    description:
      "Te enfocas en la acción, los resultados y la velocidad. Eres directo y valoras la eficiencia por encima de todo.",
    advice:
      "Neurotip: Practica la paciencia. A veces, construir la relación (Azul) o analizar los detalles (Verde) puede llevar a un mejor trato a largo plazo que solo buscar una victoria rápida.",
  },
  blue: {
    title: "Visionario (Azul)",
    description:
      "Te enfocas en la gente, las relaciones y el 'panorama general'. La armonía y el trabajo en equipo son tu prioridad.",
    advice:
      "Neurotip: No temas al conflicto productivo. Asegúrate de no sacrificar tus intereses solo por mantener a todos felices. Usa datos (Verde) para respaldar tus sentimientos.",
  },
  green: {
    title: "Pragmático (Verde)",
    description:
      "Te enfocas en las ideas, los procesos y el análisis. Valoras la lógica, los datos exactos y la planificación detallada.",
    advice:
      "Neurotip: Cuidado con la 'Parálisis por Análisis'. En algún momento, necesitas dejar de calcular y empezar a actuar (Rojo). Conecta con el lado humano (Azul) del trato.",
  },
  rainbow: {
    title: "Situacional (Arcoíris)",
    description:
      "¡Eres un camaleón! Tu estilo se adapta según la situación o el entorno. Tienes un equilibrio entre los tres colores.",
    advice:
      "Neurotip: Esta es una gran habilidad, pero cuidado con parecer inconsistente. Asegúrate de que tus valores centrales sean claros, sin importar qué 'sombrero' lleves puesto hoy.",
  },
};
