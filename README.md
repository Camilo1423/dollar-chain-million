# Dollar Chain - Aplicación de Seguimiento de Criptomonedas

## Descripción
Dollar Chain es una aplicación móvil desarrollada en React Native que proporciona información en tiempo real sobre el mercado de criptomonedas. La aplicación está diseñada para ofrecer una experiencia intuitiva y completa para usuarios interesados en el seguimiento y análisis de criptomonedas.

### Características Principales
- **Seguimiento en Tiempo Real**: Monitoreo actualizado de precios y tendencias del mercado de criptomonedas
- **Métricas Detalladas**: Visualización de datos importantes como:
  - Precio en USD y BTC
  - Cambios porcentuales (1h, 24h, 7d)
  - Capitalización de mercado
  - Volumen de operaciones
  - Suministro circulante y total
- **Sistema de Favoritos**: Capacidad para marcar y seguir criptomonedas específicas
- **Interfaz Intuitiva**: Diseño limpio y fácil de usar que permite acceder rápidamente a la información relevante
- **Navegación Eficiente**: Estructura organizada que facilita el acceso a diferentes secciones de la aplicación

### Tecnologías Implementadas
- React Native con Expo para desarrollo multiplataforma
- TypeScript para type safety y mejor mantenibilidad
- Clean Architecture para una estructura de código robusta y escalable
- Expo Router para navegación declarativa y eficiente

### Objetivo
Dollar Chain busca proporcionar una herramienta confiable y fácil de usar para que los usuarios puedan mantenerse informados sobre el mercado de criptomonedas, facilitando la toma de decisiones informadas en el mundo de las criptomonedas.

## Requisitos Previos
- Node.js instalado
- npm o yarn instalado
- Android Studio (para emulador) o dispositivo físico Android
- Git instalado

## Pasos para la Ejecución

### 1. Descargar el Código
```bash
git clone https://github.com/Camilo1423/dollar-chain-million
cd dollar-chain-million
```

### 2. Instalar Dependencias
```bash
npm install
# o si usas yarn
yarn install
```

### 3. Instalar Dev Client
1. Descargar el archivo APK de dev-client desde el siguiente enlace:
   [https://drive.google.com/file/d/1eIBfUpWZjLDYNPBzZVUOob_GC3XGYcyU/view?usp=sharing]
2. Instalar el APK en tu dispositivo o emulador

### 4. Ejecutar la Aplicación
1. Iniciar el servidor de desarrollo:
```bash
npm start
```

2. Presionar la tecla `a` para ejecutar la aplicación en Android

### Notas Importantes para Dispositivos Físicos
Si estás utilizando un dispositivo físico Android, asegúrate de:
1. Tener activado el **Modo Desarrollador**
   - Ve a Configuración > Acerca del teléfono
   - Toca 7 veces en "Número de compilación"
2. Activar la **Depuración USB**
   - Ve a Configuración > Opciones de desarrollador
   - Activa "Depuración USB"
3. Conectar el dispositivo a la computadora mediante USB
4. Aceptar el permiso de depuración USB en el dispositivo cuando se solicite

## Solución de Problemas
Si encuentras algún error durante la instalación o ejecución, asegúrate de:
- Tener todas las dependencias correctamente instaladas
- Tener el dispositivo correctamente conectado y configurado
- Tener los permisos necesarios en el dispositivo

## Documentación Técnica

### Arquitectura del Sistema

El proyecto está estructurado siguiendo los principios de Clean Architecture y Domain-Driven Design (DDD), organizado en capas bien definidas:

#### 1. Capa de Presentación (`/src/presentation`)
- **Views**: Componentes de React Native que representan la interfaz de usuario
- **Hooks**: Custom hooks para la lógica de presentación
- **Container**: Configuración de la inyección de dependencias
- **CSS**: Estilos y temas de la aplicación
- **Assets**: Recursos estáticos (imágenes, fuentes, etc.)

#### 2. Capa de Aplicación (`/src/application`)
- **Use Cases**: Implementación de los casos de uso de la aplicación
- Coordina la interacción entre la capa de presentación y el dominio
- Maneja la lógica de negocio específica de la aplicación

#### 3. Capa de Dominio (`/src/domain`)
- **Entities**: Objetos de negocio centrales
- **Repositories**: Interfaces que definen contratos para el acceso a datos
- Contiene las reglas de negocio core y es independiente de frameworks

#### 4. Capa de Infraestructura (`/src/infrastructure`)
- **Services**: Implementaciones concretas de servicios externos
- **Mappers**: Transformación entre objetos de dominio y DTOs
- **DTOs**: Objetos de transferencia de datos
- Implementa las interfaces definidas en la capa de dominio

#### 5. Capa Compartida (`/src/shared`)
- **Storage**: Manejo de almacenamiento local
- **Remote**: Configuración de servicios remotos
- **Helpers**: Utilidades y funciones auxiliares
- **Environments**: Configuración de variables de entorno

### Estructura de la Aplicación (`/app`)
La aplicación utiliza Expo Router para la navegación, con una estructura basada en archivos:
- `_layout.tsx`: Layout principal de la aplicación
- `index.tsx`: Página principal
- `+not-found.tsx`: Página 404
- `/crypto`: Módulo de criptomonedas
- `/favorites`: Módulo de favoritos

### Buenas Prácticas Implementadas

1. **Separación de Responsabilidades**
   - Cada capa tiene una responsabilidad única y bien definida
   - Las dependencias fluyen hacia adentro, desde la capa externa hacia el dominio

2. **Inversión de Dependencias**
   - Las capas internas no dependen de las externas
   - Uso de interfaces para desacoplar implementaciones

3. **Patrones de Diseño**
   - Repository Pattern para el acceso a datos
   - Dependency Injection para la gestión de dependencias
   - Mapper Pattern para la transformación de datos

4. **Organización del Código**
   - Estructura modular y escalable
   - Nombres descriptivos y consistentes
   - Separación clara de concerns

5. **Manejo de Estado**
   - Uso de hooks personalizados para la lógica de estado
   - Separación de la lógica de negocio de la UI

### Flujo de Datos
1. La capa de presentación recibe interacciones del usuario
2. Los casos de uso en la capa de aplicación coordinan la lógica
3. El dominio procesa las reglas de negocio
4. La infraestructura maneja la persistencia y servicios externos
5. Los datos fluyen de vuelta a través de las capas hasta la UI

### Consideraciones Técnicas
- Uso de TypeScript para type safety
- Implementación de Clean Architecture para mantenibilidad
- Expo Router para navegación declarativa
- Manejo de dependencias a través de inyección de dependencias
