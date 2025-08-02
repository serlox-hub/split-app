const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Azul oscuro
        secondary: "#3B82F6", // Azul claro
        accent: "#FBBF24", // Amarillo dorado
        muted: "#9CA3AF", // Gris medio
        surface: "#FFFFFF", // Fondo blanco
        background: "#F9FAFB", // Fondo gris claro
        danger: "#EF4444", // Rojo
        success: "#10B981", // Verde
      },
    },
  },
  plugins: [],
};

export default config;
