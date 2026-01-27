# Imagen base ligera con Node
FROM node:20-alpine

# Instalar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo archivos necesarios para instalar deps
COPY package.json pnpm-lock.yaml ./

# Instalamos dependencias
RUN pnpm install

# Copiamos el resto del proyecto
COPY . .

# Exponemos el puerto de Next
EXPOSE 3000

# Comando de desarrollo
CMD ["pnpm", "dev"]
