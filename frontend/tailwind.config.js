/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#B8B8B8",
          
          "secondary": "#B8B8B8",
                    
          "accent": "#B8B8B8",
                    
          "neutral": "#EBEBEB",
                    
          "base-100": "#FFFFFF",
                    
          "info": "#0000FF",
                    
          "success": "#008000",
                    
          "warning": "#A6A659",
                    
          "error": "#FF0000",
        },
      },
    ],
  },
  plugins: [
    require("daisyui"),
  ],
}

