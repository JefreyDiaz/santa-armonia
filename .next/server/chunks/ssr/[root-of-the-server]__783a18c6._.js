module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/services/otros/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>OtrosServiciosPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// Servicios de depilación
const depilacionesFaciales = [
    {
        id: 'depilacion-cejas',
        nombre: 'Depilación de Cejas',
        duracion: '30 min',
        precio: 25000,
        descripcion: 'Depilación profesional de cejas con cera para dar forma perfecta.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-bigote',
        nombre: 'Depilación de Bigote',
        duracion: '20 min',
        precio: 20000,
        descripcion: 'Depilación de vello facial superior con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-barbilla',
        nombre: 'Depilación de Barbilla',
        duracion: '25 min',
        precio: 22000,
        descripcion: 'Depilación de vello en la zona de la barbilla.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-facial-completa',
        nombre: 'Depilación Facial Completa',
        duracion: '45 min',
        precio: 45000,
        descripcion: 'Depilación completa del rostro incluyendo cejas, bigote, barbilla y patillas.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    }
];
const depilacionesCorporales = [
    {
        id: 'depilacion-brazos',
        nombre: 'Depilación de Brazos',
        duracion: '45 min',
        precio: 45000,
        descripcion: 'Depilación completa de brazos con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-piernas',
        nombre: 'Depilación de Piernas',
        duracion: '1 hora',
        precio: 65000,
        descripcion: 'Depilación completa de piernas con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-axilas',
        nombre: 'Depilación de Axilas',
        duracion: '20 min',
        precio: 20000,
        descripcion: 'Depilación de axilas con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-bikini',
        nombre: 'Depilación de Bikini',
        duracion: '30 min',
        precio: 35000,
        descripcion: 'Depilación de zona íntima con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 'depilacion-espalda',
        nombre: 'Depilación de Espalda',
        duracion: '1 hora',
        precio: 70000,
        descripcion: 'Depilación completa de espalda con cera.',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    }
];
// Masajes relajantes y descontracturantes (movidos desde corporales)
const masajesRelajantes = [
    {
        id: 'masaje-relajante',
        nombre: 'Masaje Relajante',
        indicacion: 'INDICADO PARA ALIVIAR TENSIONES FÍSICAS Y EMOCIONALES',
        duracion: '1 HORA',
        precio: 120000,
        descripcion: 'Masaje suave y relajante diseñado para reducir el estrés y promover la relajación profunda.',
        incluye: [
            'Aromaterapia',
            'Musicoterapia',
            'Piedras volcánicas',
            'Masaje manual'
        ],
        imagen: '/images/Servicios/masaje/WIL_5045.jpg'
    },
    {
        id: 'masaje-descontracturante',
        nombre: 'Masaje Descontracturante',
        duracion: '1 HORA',
        precio: 120000,
        descripcion: 'Masaje profundo especializado para liberar tensiones y contracturas musculares.',
        incluye: [
            'Vacunoterapia',
            'Masajeador eléctrico',
            'Masaje manual con presión'
        ],
        imagen: '/images/Servicios/masaje/WIL_5191.jpg'
    }
];
// Otros servicios especializados
const otrosServiciosEspecializados = [
    {
        id: 'valoracion',
        nombre: 'Valoración',
        indicacion: 'FACIAL O CORPORAL',
        duracion: '20 min',
        precio: 0,
        descripcion: 'Consulta especializada para evaluar tus necesidades y determinar el mejor tratamiento facial o corporal según tu tipo de piel y objetivos.',
        precioEspecial: 'Sin costo',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
    },
    {
        id: 'cauterizacion-verrugas',
        nombre: 'Cauterización de Verrugas',
        indicacion: 'SEGÚN VALORACIÓN MÉDICA',
        descripcion: 'Tratamiento especializado para la eliminación segura de verrugas y lunares mediante técnicas de cauterización.',
        precio: 'Valor: Según valoración',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
    },
    {
        id: 'lipo-papada',
        nombre: 'Lipo Papada',
        descripcion: 'Tratamiento de liposucción de papada a través de quemadores de grasa especializados.',
        precio: 'Valor: Según valoración',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
    },
    {
        id: 'lispoflas',
        nombre: 'Lispoflas',
        descripcion: 'Tratamiento especializado para la reducción de grasa localizada mediante técnicas avanzadas.',
        precio: 'Valor: Según valoración',
        imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
    }
];
// Suero terapia
const sueroTerapia = {
    nombre: 'SUERO TERAPIA',
    descripcion: 'Cada suero es indicado para una necesidad específica.',
    tipos: [
        'Reductor',
        'Antiedad',
        'Inmunológico',
        'Desintoxicante',
        'Energéticos',
        'Hidratante',
        'Vitalidad',
        'Entre otros'
    ],
    precio: 'Valor: De acuerdo al suero',
    imagen: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0010.jpg'
};
function OtrosServiciosPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            background: 'var(--spa-gradient-soft)',
            minHeight: '100vh',
            padding: 'var(--spa-spacing-xl) 0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 var(--spa-spacing-md)',
                    textAlign: 'center',
                    marginBottom: 'var(--spa-spacing-xxl)',
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        style: {
                            textDecoration: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                background: 'var(--spa-gradient-primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: 'var(--spa-border-radius-small)',
                                padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontFamily: 'Montserrat, sans-serif',
                                boxShadow: 'var(--spa-shadow-soft)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            onMouseEnter: (e)=>{
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                            },
                            onMouseLeave: (e)=>{
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--spa-shadow-soft)';
                            },
                            children: "← Volver a Inicio"
                        }, void 0, false, {
                            fileName: "[project]/src/app/services/otros/page.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            fontSize: '3rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            marginBottom: 'var(--spa-spacing-md)',
                            paddingTop: '60px'
                        },
                        children: "Otros Servicios"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: '1.2rem',
                            color: 'var(--spa-text-secondary)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: 1.6
                        },
                        children: "Descubre nuestra amplia gama de servicios adicionales: depilaciones, masajes relajantes, tratamientos especializados y más."
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/otros/page.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 var(--spa-spacing-md)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 'var(--spa-spacing-xl)'
                        },
                        children: "Depilaciones Faciales"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spa-spacing-lg)',
                            marginBottom: 'var(--spa-spacing-xxl)'
                        },
                        children: depilacionesFaciales.map((servicio)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    borderRadius: 'var(--spa-border-radius)',
                                    padding: 'var(--spa-spacing-lg)',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: 'var(--spa-primary)',
                                            fontSize: '1.3rem',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: '600',
                                            marginBottom: 'var(--spa-spacing-md)'
                                        },
                                        children: servicio.nombre
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 'var(--spa-spacing-sm)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-text-light)',
                                                    fontSize: '0.9rem'
                                                },
                                                children: [
                                                    "⏱️ ",
                                                    servicio.duracion
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-primary)',
                                                    fontWeight: '700',
                                                    fontSize: '1.3rem'
                                                },
                                                children: [
                                                    "$",
                                                    servicio.precio.toLocaleString('es-CO')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-text-secondary)',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            marginBottom: 'var(--spa-spacing-lg)',
                                            flex: 1
                                        },
                                        children: servicio.descripcion
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 'auto'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/reservar?seleccion=${encodeURIComponent(servicio.nombre)}`,
                                            style: {
                                                textDecoration: 'none'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    width: '100%',
                                                    background: 'var(--spa-gradient-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--spa-border-radius-small)',
                                                    padding: 'var(--spa-spacing-md)',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    transition: 'all 0.3s ease'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                },
                                                children: [
                                                    "Reservar ",
                                                    servicio.nombre
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 336,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/otros/page.tsx",
                                            lineNumber: 332,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, servicio.id, true, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 'var(--spa-spacing-xl)'
                        },
                        children: "Depilaciones Corporales"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 368,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spa-spacing-lg)',
                            marginBottom: 'var(--spa-spacing-xxl)'
                        },
                        children: depilacionesCorporales.map((servicio)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    borderRadius: 'var(--spa-border-radius)',
                                    padding: 'var(--spa-spacing-lg)',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: 'var(--spa-primary)',
                                            fontSize: '1.3rem',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: '600',
                                            marginBottom: 'var(--spa-spacing-md)'
                                        },
                                        children: servicio.nombre
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 'var(--spa-spacing-sm)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-text-light)',
                                                    fontSize: '0.9rem'
                                                },
                                                children: [
                                                    "⏱️ ",
                                                    servicio.duracion
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-primary)',
                                                    fontWeight: '700',
                                                    fontSize: '1.3rem'
                                                },
                                                children: [
                                                    "$",
                                                    servicio.precio.toLocaleString('es-CO')
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-text-secondary)',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            marginBottom: 'var(--spa-spacing-lg)',
                                            flex: 1
                                        },
                                        children: servicio.descripcion
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 439,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 'auto'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/reservar?seleccion=${encodeURIComponent(servicio.nombre)}`,
                                            style: {
                                                textDecoration: 'none'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    width: '100%',
                                                    background: 'var(--spa-gradient-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--spa-border-radius-small)',
                                                    padding: 'var(--spa-spacing-md)',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    transition: 'all 0.3s ease'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                },
                                                children: [
                                                    "Reservar ",
                                                    servicio.nombre
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 454,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/otros/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 449,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, servicio.id, true, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 'var(--spa-spacing-xl)'
                        },
                        children: "Masajes Relajantes"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 400px))',
                            gap: 'var(--spa-spacing-xl)',
                            marginBottom: 'var(--spa-spacing-xxl)',
                            justifyContent: 'center',
                            padding: '0 var(--spa-spacing-md)'
                        },
                        children: masajesRelajantes.map((masaje)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    borderRadius: 'var(--spa-border-radius)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            height: '250px',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: masaje.imagen,
                                            alt: masaje.nombre,
                                            fill: true,
                                            style: {
                                                objectFit: 'cover'
                                            },
                                            quality: 85,
                                            sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/otros/page.tsx",
                                            lineNumber: 528,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            padding: 'var(--spa-spacing-lg)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 'var(--spa-spacing-md)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            margin: '0 0 var(--spa-spacing-sm) 0',
                                                            color: 'var(--spa-primary)',
                                                            fontSize: '1.5rem',
                                                            fontFamily: 'Montserrat, sans-serif',
                                                            fontWeight: '600'
                                                        },
                                                        children: masaje.nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 546,
                                                        columnNumber: 19
                                                    }, this),
                                                    masaje.indicacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            color: 'var(--spa-text-light)',
                                                            fontSize: '0.9rem',
                                                            fontStyle: 'italic',
                                                            marginBottom: 'var(--spa-spacing-sm)'
                                                        },
                                                        children: masaje.indicacion
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 557,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: 'var(--spa-spacing-sm)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: 'var(--spa-text-light)',
                                                                    fontSize: '0.9rem'
                                                                },
                                                                children: [
                                                                    "⏱️ ",
                                                                    masaje.duracion
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                                lineNumber: 573,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: 'var(--spa-primary)',
                                                                    fontWeight: '700',
                                                                    fontSize: '1.3rem'
                                                                },
                                                                children: [
                                                                    "$",
                                                                    masaje.precio.toLocaleString('es-CO')
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                                lineNumber: 579,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 567,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    color: 'var(--spa-text-secondary)',
                                                    fontSize: '1rem',
                                                    lineHeight: 1.6,
                                                    marginBottom: 'var(--spa-spacing-md)'
                                                },
                                                children: masaje.descripcion
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 589,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: 'var(--spa-spacing-md)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        style: {
                                                            color: 'var(--spa-text-primary)',
                                                            fontSize: '1.1rem',
                                                            marginBottom: 'var(--spa-spacing-sm)',
                                                            fontFamily: 'Montserrat, sans-serif',
                                                            fontWeight: '600'
                                                        },
                                                        children: "Incluye:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 599,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        style: {
                                                            listStyle: 'none',
                                                            padding: 0,
                                                            margin: 0
                                                        },
                                                        children: masaje.incluye.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                style: {
                                                                    color: 'var(--spa-text-secondary)',
                                                                    fontSize: '0.9rem',
                                                                    marginBottom: '4px',
                                                                    paddingLeft: '20px',
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            position: 'absolute',
                                                                            left: 0,
                                                                            color: 'var(--spa-primary)'
                                                                        },
                                                                        children: "✨"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                                        lineNumber: 621,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    item
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                                lineNumber: 614,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 608,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 598,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: 'auto',
                                                    paddingTop: 'var(--spa-spacing-md)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/reservar?seleccion=${encodeURIComponent(masaje.nombre)}`,
                                                    style: {
                                                        textDecoration: 'none'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        style: {
                                                            width: '100%',
                                                            background: 'var(--spa-gradient-primary)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: 'var(--spa-border-radius-small)',
                                                            padding: 'var(--spa-spacing-md)',
                                                            fontSize: '1.1rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            fontFamily: 'Montserrat, sans-serif',
                                                            transition: 'all 0.3s ease'
                                                        },
                                                        onMouseEnter: (e)=>{
                                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                                            e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                                        },
                                                        onMouseLeave: (e)=>{
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = 'none';
                                                        },
                                                        children: [
                                                            "Reservar ",
                                                            masaje.nombre
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/services/otros/page.tsx",
                                                    lineNumber: 635,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 634,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, masaje.id, true, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 506,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 497,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        style: {
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            textAlign: 'center',
                            marginBottom: 'var(--spa-spacing-xl)'
                        },
                        children: "Servicios Especializados"
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 672,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: 'var(--spa-spacing-lg)',
                            marginBottom: 'var(--spa-spacing-xxl)'
                        },
                        children: otrosServiciosEspecializados.map((servicio)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    borderRadius: 'var(--spa-border-radius)',
                                    padding: 'var(--spa-spacing-lg)',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%'
                                },
                                onMouseEnter: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-strong)';
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        style: {
                                            color: 'var(--spa-primary)',
                                            fontSize: '1.3rem',
                                            fontFamily: 'Montserrat, sans-serif',
                                            fontWeight: '600',
                                            marginBottom: 'var(--spa-spacing-md)'
                                        },
                                        children: servicio.nombre
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 712,
                                        columnNumber: 15
                                    }, this),
                                    servicio.indicacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-text-light)',
                                            fontSize: '0.9rem',
                                            fontStyle: 'italic',
                                            marginBottom: 'var(--spa-spacing-sm)'
                                        },
                                        children: servicio.indicacion
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 723,
                                        columnNumber: 17
                                    }, this),
                                    servicio.duracion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: 'var(--spa-spacing-sm)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-text-light)',
                                                    fontSize: '0.9rem'
                                                },
                                                children: [
                                                    "⏱️ ",
                                                    servicio.duracion
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 740,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: 'var(--spa-primary)',
                                                    fontWeight: '700',
                                                    fontSize: '1.2rem'
                                                },
                                                children: servicio.precioEspecial || (servicio.precio > 0 ? `$${servicio.precio.toLocaleString('es-CO')}` : 'Sin costo')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 746,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 734,
                                        columnNumber: 17
                                    }, this),
                                    !servicio.duracion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-primary)',
                                            fontWeight: '700',
                                            fontSize: '1.2rem',
                                            marginBottom: 'var(--spa-spacing-md)'
                                        },
                                        children: servicio.precio
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-text-secondary)',
                                            fontSize: '1rem',
                                            lineHeight: 1.6,
                                            marginBottom: 'var(--spa-spacing-lg)',
                                            flex: 1
                                        },
                                        children: servicio.descripcion
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 767,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 'auto'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/reservar?seleccion=${encodeURIComponent(servicio.nombre)}`,
                                            style: {
                                                textDecoration: 'none'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                style: {
                                                    width: '100%',
                                                    background: 'var(--spa-gradient-primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 'var(--spa-border-radius-small)',
                                                    padding: 'var(--spa-spacing-md)',
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    fontFamily: 'Montserrat, sans-serif',
                                                    transition: 'all 0.3s ease'
                                                },
                                                onMouseEnter: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                                },
                                                onMouseLeave: (e)=>{
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                },
                                                children: [
                                                    "Reservar ",
                                                    servicio.nombre
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/services/otros/page.tsx",
                                                lineNumber: 782,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/services/otros/page.tsx",
                                            lineNumber: 778,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 777,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, servicio.id, true, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 683,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: 'white',
                            borderRadius: 'var(--spa-border-radius)',
                            padding: 'var(--spa-spacing-xl)',
                            boxShadow: 'var(--spa-shadow-medium)',
                            marginBottom: 'var(--spa-spacing-xxl)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    color: 'var(--spa-primary)',
                                    fontSize: '2rem',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    marginBottom: 'var(--spa-spacing-lg)'
                                },
                                children: sueroTerapia.nombre
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 821,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--spa-text-secondary)',
                                    fontSize: '1.1rem',
                                    textAlign: 'center',
                                    marginBottom: 'var(--spa-spacing-lg)',
                                    maxWidth: '600px',
                                    margin: '0 auto var(--spa-spacing-lg) auto'
                                },
                                children: sueroTerapia.descripcion
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 832,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 'var(--spa-spacing-md)',
                                    marginBottom: 'var(--spa-spacing-lg)'
                                },
                                children: sueroTerapia.tipos.map((tipo, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            background: 'var(--spa-gradient-soft)',
                                            padding: 'var(--spa-spacing-md)',
                                            borderRadius: 'var(--spa-border-radius-small)',
                                            textAlign: 'center',
                                            color: 'var(--spa-text-primary)',
                                            fontWeight: '500'
                                        },
                                        children: tipo
                                    }, index, false, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 850,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 843,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--spa-primary)',
                                    fontSize: '1.2rem',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    marginBottom: 'var(--spa-spacing-lg)'
                                },
                                children: sueroTerapia.precio
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 866,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: `/reservar?seleccion=${encodeURIComponent(sueroTerapia.nombre)}`,
                                    style: {
                                        textDecoration: 'none'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            background: 'var(--spa-gradient-primary)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 'var(--spa-border-radius-small)',
                                            padding: 'var(--spa-spacing-md) var(--spa-spacing-lg)',
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            fontFamily: 'Montserrat, sans-serif',
                                            transition: 'all 0.3s ease'
                                        },
                                        onMouseEnter: (e)=>{
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                        },
                                        onMouseLeave: (e)=>{
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        },
                                        children: [
                                            "Reservar ",
                                            sueroTerapia.nombre
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/services/otros/page.tsx",
                                        lineNumber: 881,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/otros/page.tsx",
                                    lineNumber: 877,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 876,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 814,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            background: 'white',
                            borderRadius: 'var(--spa-border-radius)',
                            padding: 'var(--spa-spacing-xl)',
                            boxShadow: 'var(--spa-shadow-medium)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    color: 'var(--spa-primary)',
                                    fontSize: '2rem',
                                    marginBottom: 'var(--spa-spacing-md)',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '600'
                                },
                                children: "¿Necesitas asesoría personalizada?"
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 917,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--spa-text-secondary)',
                                    fontSize: '1.1rem',
                                    marginBottom: 'var(--spa-spacing-lg)',
                                    maxWidth: '600px',
                                    margin: '0 auto var(--spa-spacing-lg) auto'
                                },
                                children: "Nuestras especialistas te ayudarán a elegir el servicio perfecto según tus necesidades y objetivos específicos."
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 926,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/reservar",
                                style: {
                                    textDecoration: 'none'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    style: {
                                        background: 'var(--spa-gradient-primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--spa-border-radius-small)',
                                        padding: 'var(--spa-spacing-md) var(--spa-spacing-lg)',
                                        fontSize: '1.2rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontFamily: 'Montserrat, sans-serif',
                                        boxShadow: 'var(--spa-shadow-soft)',
                                        transition: 'all 0.3s ease'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = 'var(--spa-shadow-medium)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--spa-shadow-soft)';
                                    },
                                    children: "Consultar Disponibilidad"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/services/otros/page.tsx",
                                    lineNumber: 937,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/services/otros/page.tsx",
                                lineNumber: 936,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/services/otros/page.tsx",
                        lineNumber: 910,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/services/otros/page.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/services/otros/page.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__783a18c6._.js.map