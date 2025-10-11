module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/components/Banner.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Banner
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Banner() {
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoLoaded, setIsVideoLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Estados para scroll reveal
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLogoVisible, setIsLogoVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDecorationsVisible, setIsDecorationsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Referencias para Intersection Observer
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const logoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Intersection Observer para scroll reveal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    if (entry.target === sectionRef.current) {
                        setIsVisible(true);
                        setTimeout(()=>setIsDecorationsVisible(true), 300);
                        setTimeout(()=>setIsLogoVisible(true), 600);
                    }
                }
            });
        }, observerOptions);
        // Observar elementos
        if (sectionRef.current) observer.observe(sectionRef.current);
        return ()=>observer.disconnect();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkMobile = ()=>setIsMobile(window.innerWidth < 600);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    // Manejar la carga del video
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const video = videoRef.current;
        if (video) {
            const handleLoadedData = ()=>{
                setIsVideoLoaded(true);
            };
            const handleError = ()=>{
                console.warn('Error cargando video, usando imagen de fallback');
                setIsVideoLoaded(false);
            };
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('error', handleError);
            return ()=>{
                video.removeEventListener('loadeddata', handleLoadedData);
                video.removeEventListener('error', handleError);
            };
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        style: {
            position: 'relative',
            width: '100%',
            height: '100dvh',
            color: '#fff',
            textAlign: 'center',
            overflow: 'hidden',
            fontFamily: 'serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,
            margin: 0,
            padding: 0,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 1s ease-out'
        },
        className: "jsx-c80ab1cb01060ae7",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@400;500;600;700&display=swap",
                rel: "stylesheet",
                className: "jsx-c80ab1cb01060ae7"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'var(--spa-gradient-primary)',
                    borderRadius: '50%',
                    opacity: isDecorationsVisible ? 0.1 : 0,
                    animation: isDecorationsVisible ? 'float 6s ease-in-out infinite' : 'none',
                    transition: 'opacity 1s ease-out'
                },
                className: "jsx-c80ab1cb01060ae7"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '15%',
                    right: '8%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--spa-accent)',
                    borderRadius: '50%',
                    opacity: isDecorationsVisible ? 0.15 : 0,
                    animation: isDecorationsVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
                    transition: 'opacity 1s ease-out 0.3s'
                },
                className: "jsx-c80ab1cb01060ae7"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "c80ab1cb01060ae7",
                children: "@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes slideInFromBottom{0%{opacity:0;transform:translateY(60px)}to{opacity:1;transform:translateY(0)}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100dvh',
                    zIndex: -2,
                    margin: 0,
                    padding: 0,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(1.1)',
                    transition: 'all 1.5s ease-out'
                },
                className: "jsx-c80ab1cb01060ae7",
                children: [
                    !isVideoLoaded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/Servicios/general/ed9000f0cd2e51871fa54a100a4d7c62-cover.jpg",
                        alt: "Santa Armonía Spa Background",
                        fill: true,
                        style: {
                            objectFit: 'cover',
                            objectPosition: 'center'
                        },
                        priority: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Banner.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        autoPlay: true,
                        muted: true,
                        loop: true,
                        playsInline: true,
                        preload: "metadata",
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            opacity: isVideoLoaded ? 1 : 0,
                            transition: 'opacity 1s ease-in-out'
                        },
                        className: "jsx-c80ab1cb01060ae7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                src: "/videos/hero-1.mp4",
                                type: "video/mp4",
                                className: "jsx-c80ab1cb01060ae7"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Banner.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, this),
                            "Tu navegador no soporta videos HTML5."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Banner.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100dvh',
                    zIndex: -1,
                    pointerEvents: 'none',
                    background: 'linear-gradient(135deg, rgba(139, 125, 155, 0.1) 0%, rgba(184, 169, 201, 0.15) 50%, rgba(212, 196, 231, 0.2) 100%)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 1.5s ease-out 0.3s'
                },
                className: "jsx-c80ab1cb01060ae7"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 221,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                className: "jsx-c80ab1cb01060ae7",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: logoRef,
                    style: {
                        background: 'rgba(255,255,255,0.7)',
                        borderRadius: 'var(--spa-border-radius)',
                        padding: isMobile ? '4vw 3vw' : '6vw 4vw',
                        maxWidth: '90vw',
                        boxShadow: 'var(--spa-shadow-strong)',
                        margin: '0 auto',
                        display: 'inline-block',
                        border: '1px solid rgba(212, 196, 231, 0.3)',
                        backdropFilter: 'blur(10px)',
                        opacity: isLogoVisible ? 1 : 0,
                        transform: isLogoVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
                        transition: 'all 1s ease-out'
                    },
                    className: "jsx-c80ab1cb01060ae7",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        src: "/images/multimedia-santa-armonia/logo_page-0001.png",
                        alt: "Santa Armonía Facial & Corporal",
                        width: 400,
                        height: 200,
                        style: {
                            width: isMobile ? '70vw' : '50vw',
                            height: 'auto',
                            maxWidth: '500px',
                            minWidth: '250px',
                            objectFit: 'contain',
                            filter: 'drop-shadow(0 4px 16px rgba(139, 107, 139, 0.2))'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Banner.tsx",
                        lineNumber: 265,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Banner.tsx",
                    lineNumber: 248,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/components/Banner.tsx",
                lineNumber: 236,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/Banner.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
}),
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
"[project]/src/app/components/Servicios.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Servicios
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const servicios = [
    {
        nombre: 'Tratamientos Faciales',
        href: '/services/faciales',
        img: '/images/Servicios/Facial/1641d0e14126d0d9f943bccd767dcb50-xxlarge.jpg',
        alt: 'Tratamientos faciales profesionales',
        descripcion: 'Limpieza profunda, rejuvenecimiento y tratamientos especializados'
    },
    {
        nombre: 'Tratamientos Corporales',
        href: '/services/corporales',
        img: '/images/Servicios/masaje/WIL_5045.jpg',
        alt: 'Tratamientos corporales y masajes',
        descripcion: 'Masajes reductores, moldeadores, anticelulitis y especializados'
    },
    {
        nombre: 'Otros Servicios',
        href: '/services/otros',
        img: '/images/Servicios/general/401e507fd8d66d1a9ec18559a4bce0a0-xlarge.jpg',
        alt: 'Otros servicios especializados',
        descripcion: 'Servicios adicionales y tratamientos especializados'
    }
];
function Servicios() {
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Estados para scroll reveal
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTitleVisible, setIsTitleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCardsVisible, setIsCardsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Referencias para Intersection Observer
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cardsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Intersection Observer para scroll reveal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    if (entry.target === sectionRef.current) {
                        // Disparar todo al mismo tiempo cuando entra la sección
                        setIsVisible(true);
                        setIsTitleVisible(true);
                        setIsCardsVisible(true);
                    }
                }
            });
        }, observerOptions);
        if (sectionRef.current) observer.observe(sectionRef.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        id: "servicios-categorias",
        style: {
            padding: 'var(--spa-spacing-xxl) 0',
            textAlign: 'center',
            background: 'var(--spa-gradient-soft)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out'
        },
        className: "jsx-5d7234fb0f4d7816",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--spa-gradient-primary)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.1 : 0,
                    animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
                    transition: 'opacity 1s ease-out'
                },
                className: "jsx-5d7234fb0f4d7816"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Servicios.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '15%',
                    right: '8%',
                    width: '60px',
                    height: '60px',
                    background: 'var(--spa-accent)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.15 : 0,
                    animation: isVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
                    transition: 'opacity 1s ease-out 0.3s'
                },
                className: "jsx-5d7234fb0f4d7816"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Servicios.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "5d7234fb0f4d7816",
                children: "@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes slideInFromLeft{0%{opacity:0;transform:translate(-50px)}to{opacity:1;transform:translate(0)}}@keyframes slideInFromRight{0%{opacity:0;transform:translate(50px)}to{opacity:1;transform:translate(0)}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                ref: titleRef,
                style: {
                    marginBottom: 'var(--spa-spacing-lg)',
                    fontSize: '2.5rem',
                    color: 'var(--spa-primary)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: '600',
                    position: 'relative',
                    zIndex: 1,
                    opacity: isTitleVisible ? 1 : 0,
                    transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 0.8s ease-out'
                },
                className: "jsx-5d7234fb0f4d7816",
                children: "Nuestros Servicios"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Servicios.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cardsRef,
                style: {
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 'var(--spa-spacing-xl)',
                    flexWrap: 'wrap',
                    padding: '0 var(--spa-spacing-md)',
                    position: 'relative',
                    zIndex: 1,
                    alignItems: 'stretch',
                    minHeight: '400px',
                    opacity: isCardsVisible ? 1 : 0,
                    transform: isCardsVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 0.8s ease-out'
                },
                className: "jsx-5d7234fb0f4d7816",
                children: servicios.map((servicio, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: servicio.href,
                        style: {
                            textDecoration: 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'relative',
                                width: '280px',
                                height: '100%',
                                borderRadius: 'var(--spa-border-radius)',
                                border: '2px solid var(--spa-border-color)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                transform: hovered === idx ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
                                boxShadow: hovered === idx ? 'var(--spa-shadow-strong)' : 'var(--spa-shadow-medium)',
                                zIndex: hovered === idx ? 2 : 1,
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: '1 1 280px',
                                animation: isCardsVisible ? idx === 0 ? 'slideInFromLeft 0.8s ease-out 0.2s both' : idx === 1 ? 'slideInFromRight 0.8s ease-out 0.2s both' : 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
                            },
                            onMouseEnter: ()=>setHovered(idx),
                            onMouseLeave: ()=>setHovered(null),
                            onTouchStart: ()=>setHovered(idx),
                            onTouchEnd: ()=>setHovered(null),
                            className: "jsx-5d7234fb0f4d7816",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        height: '250px',
                                        overflow: 'hidden',
                                        flexShrink: 0,
                                        flex: '0 0 250px',
                                        position: 'relative'
                                    },
                                    className: "jsx-5d7234fb0f4d7816",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: servicio.img,
                                        alt: servicio.alt,
                                        style: {
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            transition: 'transform 0.3s ease',
                                            imageRendering: 'auto',
                                            WebkitImageRendering: 'auto',
                                            backfaceVisibility: 'hidden',
                                            WebkitBackfaceVisibility: 'hidden',
                                            transform: `translate3d(0, 0, 0) ${hovered === idx ? 'scale(1.05)' : 'scale(1)'}`,
                                            willChange: 'transform',
                                            WebkitTransform: `translate3d(0, 0, 0) ${hovered === idx ? 'scale(1.05)' : 'scale(1)'}`,
                                            imageSmoothingEnabled: true,
                                            WebkitImageSmoothingEnabled: true,
                                            MozImageSmoothingEnabled: true,
                                            msImageSmoothingEnabled: true,
                                            imageSmoothingQuality: 'high',
                                            WebkitImageSmoothingQuality: 'high',
                                            filter: servicio.nombre === 'Tratamientos Corporales' ? 'contrast(1.1) saturate(1.1) brightness(1.2) sharpness(0.5)' : 'none',
                                            WebkitFilter: servicio.nombre === 'Tratamientos Corporales' ? 'contrast(1.1) saturate(1.1) brightness(1.2) sharpness(0.5)' : 'none'
                                        },
                                        className: "jsx-5d7234fb0f4d7816"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/Servicios.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Servicios.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: 'var(--spa-spacing-md)',
                                        background: 'white',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        minHeight: '120px'
                                    },
                                    className: "jsx-5d7234fb0f4d7816",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            style: {
                                                fontFamily: 'Montserrat, sans-serif',
                                                color: 'var(--spa-primary)',
                                                fontSize: '1.4rem',
                                                margin: '0 0 var(--spa-spacing-md) 0',
                                                fontWeight: '600',
                                                textAlign: 'center'
                                            },
                                            className: "jsx-5d7234fb0f4d7816",
                                            children: servicio.nombre
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Servicios.tsx",
                                            lineNumber: 261,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: 'var(--spa-text-secondary)',
                                                fontSize: '1rem',
                                                margin: 0,
                                                lineHeight: 1.5,
                                                textAlign: 'center'
                                            },
                                            className: "jsx-5d7234fb0f4d7816",
                                            children: servicio.descripcion
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Servicios.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Servicios.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/Servicios.tsx",
                            lineNumber: 188,
                            columnNumber: 13
                        }, this)
                    }, servicio.nombre, false, {
                        fileName: "[project]/src/app/components/Servicios.tsx",
                        lineNumber: 187,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/components/Servicios.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/Servicios.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/components/Testimonios.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Testimonios
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const testimonios = [
    {
        id: 1,
        nombre: 'María González',
        tratamiento: 'Masaje Relajante',
        calificacion: 5,
        comentario: 'Excelente experiencia en Santa Armonía. El masaje fue increíble y me sentí completamente renovada. Las terapeutas son muy profesionales y el ambiente es muy relajante.',
        fecha: 'Hace 2 semanas',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0004.jpg'
    },
    {
        id: 2,
        nombre: 'Ana Rodríguez',
        tratamiento: 'Limpieza Facial Profunda',
        calificacion: 5,
        comentario: 'Mi piel se ve increíble después del tratamiento facial. La limpieza fue muy profunda y me dieron excelentes consejos para el cuidado diario.',
        fecha: 'Hace 1 mes',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0005.jpg'
    },
    {
        id: 3,
        nombre: 'Carmen López',
        tratamiento: 'Envoltura de Algas',
        calificacion: 5,
        comentario: 'La envoltura de algas fue una experiencia única. Me sentí completamente detoxificada y mi piel quedó súper suave. Definitivamente volveré.',
        fecha: 'Hace 3 semanas',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0006.jpg'
    },
    {
        id: 4,
        nombre: 'Laura Martínez',
        tratamiento: 'Masaje con Piedras Calientes',
        calificacion: 5,
        comentario: 'El masaje con piedras calientes fue espectacular. Las piedras volcánicas me ayudaron a relajarme completamente. Altamente recomendado.',
        fecha: 'Hace 2 meses',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0007.jpg'
    },
    {
        id: 5,
        nombre: 'Patricia Silva',
        tratamiento: 'Tratamiento Anti-Age',
        calificacion: 5,
        comentario: 'El tratamiento anti-age superó mis expectativas. Mi piel se ve más joven y radiante. Las terapeutas son muy expertas en su trabajo.',
        fecha: 'Hace 1 mes',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0008.jpg'
    },
    {
        id: 6,
        nombre: 'Sofia Vargas',
        tratamiento: 'Drenaje Linfático',
        calificacion: 5,
        comentario: 'El drenaje linfático me ayudó mucho con la retención de líquidos. Me sentí más ligera y con más energía después del tratamiento.',
        fecha: 'Hace 3 semanas',
        foto: '/images/multimedia-santa-armonia/Nuestros-servicios/Nuestros servicios_page-0009.jpg'
    }
];
function Testimonios() {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isAutoPlaying, setIsAutoPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isTransitioning, setIsTransitioning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [direction, setDirection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('next');
    // Estados para scroll reveal
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTitleVisible, setIsTitleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCarouselVisible, setIsCarouselVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isIndicatorsVisible, setIsIndicatorsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCTAVisible, setIsCTAVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Referencias para Intersection Observer
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const carouselRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const indicatorsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ctaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Intersection Observer para scroll reveal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    if (entry.target === sectionRef.current) {
                        setIsVisible(true);
                    } else if (entry.target === titleRef.current) {
                        setTimeout(()=>setIsTitleVisible(true), 200);
                    } else if (entry.target === carouselRef.current) {
                        setTimeout(()=>setIsCarouselVisible(true), 400);
                    } else if (entry.target === indicatorsRef.current) {
                        setTimeout(()=>setIsIndicatorsVisible(true), 600);
                    } else if (entry.target === ctaRef.current) {
                        setTimeout(()=>setIsCTAVisible(true), 800);
                    }
                }
            });
        }, observerOptions);
        // Observar elementos
        if (sectionRef.current) observer.observe(sectionRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (carouselRef.current) observer.observe(carouselRef.current);
        if (indicatorsRef.current) observer.observe(indicatorsRef.current);
        if (ctaRef.current) observer.observe(ctaRef.current);
        return ()=>observer.disconnect();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAutoPlaying) return;
        const interval = setInterval(()=>{
            setDirection('next');
            setIsTransitioning(true);
            setTimeout(()=>{
                setCurrentIndex((prev)=>(prev + 1) % testimonios.length);
                setIsTransitioning(false);
            }, 300);
        }, 5000);
        return ()=>clearInterval(interval);
    }, [
        isAutoPlaying
    ]);
    const nextTestimonio = ()=>{
        if (isTransitioning) return;
        setDirection('next');
        setIsTransitioning(true);
        setIsAutoPlaying(false);
        setTimeout(()=>{
            setCurrentIndex((prev)=>(prev + 1) % testimonios.length);
            setIsTransitioning(false);
        }, 300);
    };
    const prevTestimonio = ()=>{
        if (isTransitioning) return;
        setDirection('prev');
        setIsTransitioning(true);
        setIsAutoPlaying(false);
        setTimeout(()=>{
            setCurrentIndex((prev)=>(prev - 1 + testimonios.length) % testimonios.length);
            setIsTransitioning(false);
        }, 300);
    };
    const goToTestimonio = (index)=>{
        if (isTransitioning || index === currentIndex) return;
        setDirection(index > currentIndex ? 'next' : 'prev');
        setIsTransitioning(true);
        setIsAutoPlaying(false);
        setTimeout(()=>{
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 300);
    };
    const renderStars = (calificacion)=>{
        return Array.from({
            length: 5
        }, (_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    color: i < calificacion ? '#FFD700' : '#E0E0E0',
                    fontSize: '1.2rem',
                    marginRight: '2px',
                    transition: 'color 0.3s ease'
                },
                children: "★"
            }, i, false, {
                fileName: "[project]/src/app/components/Testimonios.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        style: {
            padding: 'var(--spa-spacing-xxl) 0',
            background: 'var(--spa-gradient-warm)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out'
        },
        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
            [
                "9b170d25e52131d5",
                [
                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                ]
            ]
        ]),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'var(--spa-gradient-primary)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.1 : 0,
                    animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
                    transition: 'opacity 1s ease-out'
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "9b170d25e52131d5",
                        [
                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                        ]
                    ]
                ])
            }, void 0, false, {
                fileName: "[project]/src/app/components/Testimonios.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '20%',
                    left: '5%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--spa-accent)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.15 : 0,
                    animation: isVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
                    transition: 'opacity 1s ease-out 0.3s'
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "9b170d25e52131d5",
                        [
                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                        ]
                    ]
                ])
            }, void 0, false, {
                fileName: "[project]/src/app/components/Testimonios.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "9b170d25e52131d5",
                dynamic: [
                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                ],
                children: `@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes slideInRight{0%{opacity:0;transform:translate(50px)}to{opacity:1;transform:translate(0)}}@keyframes slideInLeft{0%{opacity:0;transform:translate(-50px)}to{opacity:1;transform:translate(0)}}@keyframes slideInFromBottom{0%{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}.testimonial-card.__jsx-style-dynamic-selector{animation:${isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out'}}.testimonial-content.__jsx-style-dynamic-selector{animation:${isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'}}`
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 var(--spa-spacing-md)',
                    position: 'relative',
                    zIndex: 1
                },
                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                    [
                        "9b170d25e52131d5",
                        [
                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                        ]
                    ]
                ]),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: titleRef,
                        style: {
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            marginBottom: 'var(--spa-spacing-lg)',
                            opacity: isTitleVisible ? 1 : 0,
                            transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "9b170d25e52131d5",
                                [
                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                ]
                            ]
                        ]),
                        children: "Lo Que Dicen Nuestras Clientes"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Testimonios.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: carouselRef,
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--spa-spacing-lg)',
                            flexWrap: 'wrap',
                            opacity: isCarouselVisible ? 1 : 0,
                            transform: isCarouselVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "9b170d25e52131d5",
                                [
                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                ]
                            ]
                        ]),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: prevTestimonio,
                                disabled: isTransitioning,
                                style: {
                                    background: 'var(--spa-gradient-primary)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    opacity: isTransitioning ? 0.6 : 1,
                                    transform: 'scale(1)'
                                },
                                onMouseEnter: (e)=>{
                                    if (!isTransitioning) {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'scale(1)';
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ]),
                                children: "←"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 335,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    borderRadius: 'var(--spa-border-radius)',
                                    padding: 'var(--spa-spacing-xl)',
                                    maxWidth: '600px',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    position: 'relative',
                                    minHeight: '300px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    transform: isTransitioning ? direction === 'next' ? 'translateX(-20px)' : 'translateX(20px)' : 'translateX(0)',
                                    opacity: isTransitioning ? 0.7 : 1,
                                    transition: 'all 0.3s ease'
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ]) + " " + "testimonial-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: 'var(--spa-spacing-md)'
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "9b170d25e52131d5",
                                                [
                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                ]
                                            ]
                                        ]) + " " + "testimonial-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: testimonios[currentIndex].foto,
                                                alt: testimonios[currentIndex].nombre,
                                                style: {
                                                    width: '60px',
                                                    height: '60px',
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                    marginRight: 'var(--spa-spacing-md)',
                                                    border: '3px solid var(--spa-accent)',
                                                    transition: 'all 0.3s ease'
                                                },
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "9b170d25e52131d5",
                                                        [
                                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                        ]
                                                    ]
                                                ])
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                                lineNumber: 394,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                    [
                                                        "9b170d25e52131d5",
                                                        [
                                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                        ]
                                                    ]
                                                ]),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            margin: 0,
                                                            color: 'var(--spa-primary)',
                                                            fontFamily: 'Montserrat, sans-serif',
                                                            fontWeight: '600',
                                                            fontSize: '1.2rem',
                                                            transition: 'all 0.3s ease'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "9b170d25e52131d5",
                                                                [
                                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: testimonios[currentIndex].nombre
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                                        lineNumber: 408,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            margin: '4px 0',
                                                            color: 'var(--spa-text-secondary)',
                                                            fontSize: '0.9rem',
                                                            transition: 'all 0.3s ease'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "9b170d25e52131d5",
                                                                [
                                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: testimonios[currentIndex].tratamiento
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                                        lineNumber: 418,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            marginTop: '4px'
                                                        },
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                                            [
                                                                "9b170d25e52131d5",
                                                                [
                                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                                ]
                                                            ]
                                                        ]),
                                                        children: renderStars(testimonios[currentIndex].calificacion)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                                        lineNumber: 426,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                                lineNumber: 407,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                        style: {
                                            fontSize: '1.1rem',
                                            lineHeight: 1.6,
                                            color: 'var(--spa-text-primary)',
                                            fontStyle: 'italic',
                                            margin: 'var(--spa-spacing-md) 0',
                                            position: 'relative',
                                            transition: 'all 0.3s ease'
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "9b170d25e52131d5",
                                                [
                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                ]
                                            ]
                                        ]) + " " + "testimonial-content",
                                        children: [
                                            '"',
                                            testimonios[currentIndex].comentario,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                        lineNumber: 432,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            color: 'var(--spa-text-light)',
                                            fontSize: '0.9rem',
                                            margin: 0,
                                            textAlign: 'right',
                                            transition: 'all 0.3s ease'
                                        },
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                            [
                                                "9b170d25e52131d5",
                                                [
                                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                                ]
                                            ]
                                        ]) + " " + "testimonial-content",
                                        children: testimonios[currentIndex].fecha
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/Testimonios.tsx",
                                        lineNumber: 447,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 368,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: nextTestimonio,
                                disabled: isTransitioning,
                                style: {
                                    background: 'var(--spa-gradient-primary)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                                    color: 'white',
                                    fontSize: '1.5rem',
                                    boxShadow: 'var(--spa-shadow-medium)',
                                    transition: 'all 0.3s ease',
                                    opacity: isTransitioning ? 0.6 : 1,
                                    transform: 'scale(1)'
                                },
                                onMouseEnter: (e)=>{
                                    if (!isTransitioning) {
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    e.currentTarget.style.transform = 'scale(1)';
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ]),
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 462,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Testimonios.tsx",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: indicatorsRef,
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'var(--spa-spacing-sm)',
                            marginTop: 'var(--spa-spacing-lg)',
                            opacity: isIndicatorsVisible ? 1 : 0,
                            transform: isIndicatorsVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease-out'
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "9b170d25e52131d5",
                                [
                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                ]
                            ]
                        ]),
                        children: testimonios.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>goToTestimonio(index),
                                disabled: isTransitioning,
                                style: {
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: index === currentIndex ? 'var(--spa-primary)' : 'var(--spa-accent)',
                                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    opacity: isTransitioning ? 0.6 : 1,
                                    transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ])
                            }, index, false, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 509,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Testimonios.tsx",
                        lineNumber: 496,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: ctaRef,
                        style: {
                            textAlign: 'center',
                            marginTop: 'var(--spa-spacing-xl)',
                            opacity: isCTAVisible ? 1 : 0,
                            transform: isCTAVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                            [
                                "9b170d25e52131d5",
                                [
                                    isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                    isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                ]
                            ]
                        ]),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    color: 'var(--spa-text-secondary)',
                                    fontSize: '1.1rem',
                                    marginBottom: 'var(--spa-spacing-md)'
                                },
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ]),
                                children: "¿Lista para tu experiencia de relajación?"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 539,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    const el = document.getElementById('servicios-categorias');
                                    if (el) {
                                        el.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    } else {
                                        window.location.hash = '#servicios-categorias';
                                    }
                                },
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
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].dynamic([
                                    [
                                        "9b170d25e52131d5",
                                        [
                                            isTransitioning ? 'none' : direction === 'next' ? 'slideInRight 0.6s ease-out' : 'slideInLeft 0.6s ease-out',
                                            isTransitioning ? 'none' : 'fadeInUp 0.8s ease-out'
                                        ]
                                    ]
                                ]),
                                children: "Reserva Tu Cita"
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Testimonios.tsx",
                                lineNumber: 546,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/components/Testimonios.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/Testimonios.tsx",
                lineNumber: 297,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/Testimonios.tsx",
        lineNumber: 185,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/components/Galeria.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Galeria
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const galeria = [
    // FACIALES (3)
    {
        id: 1,
        titulo: 'Limpieza Facial Profunda',
        categoria: 'Faciales',
        imagen: '/images/Servicios/Facial/WIL_5066.jpg',
        descripcion: 'Limpieza facial completa con extracción y exfoliación',
        duracion: '60 min',
        precio: '$120.000'
    },
    {
        id: 2,
        titulo: 'Plasma Rico en Plaquetas',
        categoria: 'Faciales',
        imagen: '/images/Servicios/Facial/WIL_5059.jpg',
        descripcion: 'Tratamiento regenerador con PRP para rejuvenecer la piel',
        duracion: '60 min',
        precio: '$120.000'
    },
    {
        id: 3,
        titulo: 'Tratamiento Anti Edad',
        categoria: 'Faciales',
        imagen: '/images/Servicios/Facial/WIL_5079_(2).jpg',
        descripcion: 'Mascarilla y principios activos para rejuvenecer',
        duracion: '45 min',
        precio: '$130.000'
    },
    // CORPORALES (3)
    {
        id: 4,
        titulo: 'Masaje Relajante con Piedras',
        categoria: 'Corporales',
        imagen: '/images/Servicios/masaje/WIL_5045.jpg',
        descripcion: 'Masaje con piedras volcánicas calientes para relajación profunda',
        duracion: '60 min',
        precio: '$120.000'
    },
    {
        id: 5,
        titulo: 'Masaje Reductor',
        categoria: 'Corporales',
        imagen: '/images/Servicios/masaje/WIL_5213.jpg',
        descripcion: 'Tratamiento con aparatología para reducir medidas',
        duracion: '60 min',
        precio: '$60.000'
    },
    {
        id: 6,
        titulo: 'Maderoterapia',
        categoria: 'Corporales',
        imagen: '/images/Servicios/masaje/WIL_5194.jpg',
        descripcion: 'Masaje moldeador con rodillos de madera',
        duracion: '60 min',
        precio: '$80.000'
    }
];
const categorias = [
    'Todos',
    'Faciales',
    'Corporales'
];
function getItemImages(item, fuente) {
    // Si el item ya trae su set de imágenes, úsalo
    if (Array.isArray(item.imagenes) && item.imagenes.length > 0) {
        return item.imagenes.slice(0, 3);
    }
    // Armar un set de hasta 3 imágenes relacionadas de la misma categoría
    const relacionadas = fuente.filter((it)=>it.categoria === item.categoria && it.id !== item.id).map((it)=>it.imagen).filter(Boolean);
    const unique = [];
    for (const img of [
        item.imagen,
        ...relacionadas
    ]){
        if (!img) continue;
        if (!unique.includes(img)) unique.push(img);
        if (unique.length === 3) break;
    }
    // Si no alcanzan 3, solo usar las disponibles sin repetir
    return unique;
}
function GalleryCard({ item, onSelect, fuente }) {
    const images = getItemImages(item, fuente);
    const [index, setIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const total = images.length;
    const goPrev = ()=>setIndex((prev)=>(prev - 1 + total) % total);
    const goNext = ()=>setIndex((prev)=>(prev + 1) % total);
    // Autoplay individual desfasado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const initialDelay = 1000 + Math.floor(Math.random() * 2000);
        const intervalMs = 6000 + Math.floor(Math.random() * 2000);
        let intervalId;
        const timeoutId = setTimeout(()=>{
            intervalId = setInterval(()=>setIndex((prev)=>(prev + 1) % total), intervalMs);
        }, initialDelay);
        return ()=>{
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [
        total
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "gallery-item",
        style: {
            background: 'white',
            borderRadius: 'var(--spa-border-radius)',
            overflow: 'hidden',
            boxShadow: 'var(--spa-shadow-medium)',
            transition: 'all 0.3s ease'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                height: '260px',
                overflow: 'hidden',
                position: 'relative'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    src: images[index],
                    alt: item.titulo,
                    fill: true,
                    style: {
                        objectFit: 'cover'
                    },
                    quality: 85,
                    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }, index, false, {
                    fileName: "[project]/src/app/components/Galeria.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, this),
                total > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Anterior",
                            onClick: goPrev,
                            style: {
                                position: 'absolute',
                                top: '50%',
                                left: '8px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.45)',
                                color: 'white',
                                border: 'none',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            children: "‹"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Galeria.tsx",
                            lineNumber: 145,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Siguiente",
                            onClick: goNext,
                            style: {
                                position: 'absolute',
                                top: '50%',
                                right: '8px',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.45)',
                                color: 'white',
                                border: 'none',
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                cursor: 'pointer',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            children: "›"
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Galeria.tsx",
                            lineNumber: 168,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                bottom: 8,
                                left: 0,
                                right: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 6
                            },
                            children: images.map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        background: i === index ? 'white' : 'rgba(255,255,255,0.5)'
                                    }
                                }, i, false, {
                                    fileName: "[project]/src/app/components/Galeria.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Galeria.tsx",
                            lineNumber: 192,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        padding: '16px',
                        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontWeight: 600,
                                fontSize: '15px'
                            },
                            children: item.titulo
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Galeria.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: '12px',
                                opacity: 0.9
                            },
                            children: item.descripcion
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Galeria.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/Galeria.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/Galeria.tsx",
            lineNumber: 130,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/Galeria.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
function Galeria() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('Todos');
    // Estados para scroll reveal
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTitleVisible, setIsTitleVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFiltersVisible, setIsFiltersVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGalleryVisible, setIsGalleryVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Referencias para Intersection Observer
    const sectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const titleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const descriptionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const filtersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const galleryRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Intersection Observer para scroll reveal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    if (entry.target === sectionRef.current) {
                        setIsVisible(true);
                    } else if (entry.target === titleRef.current) {
                        setTimeout(()=>setIsTitleVisible(true), 200);
                    } else if (entry.target === descriptionRef.current) {
                        setTimeout(()=>setIsDescriptionVisible(true), 400);
                    } else if (entry.target === filtersRef.current) {
                        setTimeout(()=>setIsFiltersVisible(true), 600);
                    } else if (entry.target === galleryRef.current) {
                        setTimeout(()=>setIsGalleryVisible(true), 800);
                    }
                }
            });
        }, observerOptions);
        // Observar elementos
        if (sectionRef.current) observer.observe(sectionRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (descriptionRef.current) observer.observe(descriptionRef.current);
        if (filtersRef.current) observer.observe(filtersRef.current);
        if (galleryRef.current) observer.observe(galleryRef.current);
        return ()=>observer.disconnect();
    }, []);
    const galeriaFiltrada = categoriaSeleccionada === 'Todos' ? galeria : galeria.filter((item)=>item.categoria === categoriaSeleccionada);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: sectionRef,
        style: {
            padding: 'var(--spa-spacing-xxl) 0',
            background: 'var(--spa-gradient-soft)',
            position: 'relative',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 0.8s ease-out'
        },
        className: "jsx-182730ec8a027777",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '15%',
                    left: '8%',
                    width: '120px',
                    height: '120px',
                    background: 'var(--spa-gradient-primary)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.1 : 0,
                    animation: isVisible ? 'float 6s ease-in-out infinite' : 'none',
                    transition: 'opacity 1s ease-out'
                },
                className: "jsx-182730ec8a027777"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Galeria.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    bottom: '10%',
                    right: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'var(--spa-accent)',
                    borderRadius: '50%',
                    opacity: isVisible ? 0.15 : 0,
                    animation: isVisible ? 'float 8s ease-in-out infinite reverse' : 'none',
                    transition: 'opacity 1s ease-out 0.3s'
                },
                className: "jsx-182730ec8a027777"
            }, void 0, false, {
                fileName: "[project]/src/app/components/Galeria.tsx",
                lineNumber: 309,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "182730ec8a027777",
                children: "@keyframes float{0%,to{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes slideInFromBottom{0%{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}.gallery-item.jsx-182730ec8a027777{animation:.6s ease-out both scaleIn}@keyframes imageFadeIn{0%{opacity:0}to{opacity:1}}.gallery-grid.jsx-182730ec8a027777{gap:var(--spa-spacing-lg);grid-template-columns:repeat(3,1fr);display:grid}@media (width<=1024px){.gallery-grid.jsx-182730ec8a027777{grid-template-columns:repeat(2,1fr)}}@media (width<=640px){.gallery-grid.jsx-182730ec8a027777{grid-template-columns:1fr}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 var(--spa-spacing-md)',
                    position: 'relative',
                    zIndex: 1
                },
                className: "jsx-182730ec8a027777",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        ref: titleRef,
                        style: {
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            color: 'var(--spa-primary)',
                            fontFamily: 'Montserrat, sans-serif',
                            fontWeight: '600',
                            marginBottom: 'var(--spa-spacing-md)',
                            opacity: isTitleVisible ? 1 : 0,
                            transform: isTitleVisible ? 'translateY(0)' : 'translateY(30px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: "jsx-182730ec8a027777",
                        children: "Galería de Tratamientos"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Galeria.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        ref: descriptionRef,
                        style: {
                            textAlign: 'center',
                            color: 'var(--spa-text-secondary)',
                            fontSize: '1.1rem',
                            marginBottom: 'var(--spa-spacing-xl)',
                            maxWidth: '600px',
                            margin: '0 auto var(--spa-spacing-xl) auto',
                            opacity: isDescriptionVisible ? 1 : 0,
                            transform: isDescriptionVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: "jsx-182730ec8a027777",
                        children: "Descubre nuestros tratamientos especializados diseñados para tu bienestar y relajación"
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Galeria.tsx",
                        lineNumber: 415,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: filtersRef,
                        style: {
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 'var(--spa-spacing-md)',
                            marginBottom: 'var(--spa-spacing-xl)',
                            flexWrap: 'wrap',
                            opacity: isFiltersVisible ? 1 : 0,
                            transform: isFiltersVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: "jsx-182730ec8a027777",
                        children: categorias.map((categoria, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCategoriaSeleccionada(categoria),
                                style: {
                                    background: categoriaSeleccionada === categoria ? 'var(--spa-gradient-primary)' : 'transparent',
                                    color: categoriaSeleccionada === categoria ? 'white' : 'var(--spa-text-primary)',
                                    border: categoriaSeleccionada === categoria ? 'none' : '2px solid var(--spa-border-color)',
                                    borderRadius: 'var(--spa-border-radius-small)',
                                    padding: 'var(--spa-spacing-sm) var(--spa-spacing-md)',
                                    cursor: 'pointer',
                                    fontFamily: 'Montserrat, sans-serif',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    animation: isFiltersVisible ? `scaleIn 0.6s ease-out ${0.2 * index}s both` : 'none'
                                },
                                onMouseEnter: (e)=>{
                                    if (categoriaSeleccionada !== categoria) {
                                        e.currentTarget.style.background = 'var(--spa-light)';
                                    }
                                },
                                onMouseLeave: (e)=>{
                                    if (categoriaSeleccionada !== categoria) {
                                        e.currentTarget.style.background = 'transparent';
                                    }
                                },
                                className: "jsx-182730ec8a027777",
                                children: categoria
                            }, categoria, false, {
                                fileName: "[project]/src/app/components/Galeria.tsx",
                                lineNumber: 447,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Galeria.tsx",
                        lineNumber: 433,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: galleryRef,
                        style: {
                            marginBottom: 'var(--spa-spacing-xl)',
                            opacity: isGalleryVisible ? 1 : 0,
                            transform: isGalleryVisible ? 'translateY(0)' : 'translateY(40px)',
                            transition: 'all 0.8s ease-out'
                        },
                        className: "jsx-182730ec8a027777" + " " + "gallery-grid",
                        children: galeriaFiltrada.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    animation: isGalleryVisible ? `scaleIn 0.6s ease-out ${0.1 * index}s both` : 'none'
                                },
                                className: "jsx-182730ec8a027777",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(GalleryCard, {
                                    item: item,
                                    fuente: galeria,
                                    onSelect: ()=>{}
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Galeria.tsx",
                                    lineNumber: 497,
                                    columnNumber: 15
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/src/app/components/Galeria.tsx",
                                lineNumber: 496,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/components/Galeria.tsx",
                        lineNumber: 485,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/components/Galeria.tsx",
                lineNumber: 391,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/components/Galeria.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/components/Footer.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Footer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Footer() {
    // Estados para scroll reveal
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHeaderVisible, setIsHeaderVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isColumnsVisible, setIsColumnsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCopyrightVisible, setIsCopyrightVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Referencias para Intersection Observer
    const footerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const headerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const columnsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const copyrightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Intersection Observer para scroll reveal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach((entry)=>{
                if (entry.isIntersecting) {
                    if (entry.target === footerRef.current) {
                        setIsVisible(true);
                        setTimeout(()=>setIsHeaderVisible(true), 200);
                        setTimeout(()=>setIsColumnsVisible(true), 400);
                        setTimeout(()=>setIsCopyrightVisible(true), 600);
                    }
                }
            });
        }, observerOptions);
        // Observar elementos
        if (footerRef.current) observer.observe(footerRef.current);
        return ()=>observer.disconnect();
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '0 var(--spa-spacing-lg)',
            marginTop: 'var(--spa-spacing-xxl)'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            ref: footerRef,
            style: {
                background: 'linear-gradient(135deg, #4A7A7A 0%, #5D9C9C 30%, #7FB3B3 70%, #B8D4D4 100%)',
                color: 'white',
                padding: 'var(--spa-spacing-lg) 0 var(--spa-spacing-lg) 0',
                fontFamily: 'Montserrat, sans-serif',
                borderRadius: 'var(--spa-border-radius) var(--spa-border-radius) 0 0',
                maxWidth: '1200px',
                margin: '0 auto',
                boxShadow: 'var(--spa-shadow-strong)',
                position: 'relative',
                overflow: 'hidden',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.8s ease-out'
            },
            className: "jsx-842adc9253c4654e",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    id: "842adc9253c4654e",
                    children: "@keyframes fadeInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}@keyframes slideInFromLeft{0%{opacity:0;transform:translate(-50px)}to{opacity:1;transform:translate(0)}}@keyframes slideInFromRight{0%{opacity:0;transform:translate(50px)}to{opacity:1;transform:translate(0)}}@keyframes scaleIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}"
                }, void 0, false, void 0, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        height: '4px',
                        background: 'linear-gradient(90deg, var(--spa-accent) 0%, var(--spa-light) 50%, var(--spa-accent) 100%)',
                        opacity: isVisible ? 0.6 : 0,
                        transition: 'opacity 1s ease-out'
                    },
                    className: "jsx-842adc9253c4654e"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Footer.tsx",
                    lineNumber: 115,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: headerRef,
                    style: {
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 var(--spa-spacing-lg)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spa-spacing-lg)',
                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                        paddingBottom: 'var(--spa-spacing-md)',
                        opacity: isHeaderVisible ? 1 : 0,
                        transform: isHeaderVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s ease-out'
                    },
                    className: "jsx-842adc9253c4654e",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                animation: isHeaderVisible ? 'slideInFromLeft 0.8s ease-out' : 'none'
                            },
                            className: "jsx-842adc9253c4654e",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/images/multimedia-santa-armonia/logo_page-0001.png",
                                alt: "Santa Armonía Facial & Corporal",
                                width: 200,
                                height: 100,
                                style: {
                                    width: '160px',
                                    height: 'auto',
                                    objectFit: 'contain',
                                    filter: 'brightness(0) invert(1)',
                                    opacity: '0.9'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/components/Footer.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/components/Footer.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                gap: 'var(--spa-spacing-md)',
                                animation: isHeaderVisible ? 'slideInFromRight 0.8s ease-out' : 'none'
                            },
                            className: "jsx-842adc9253c4654e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.instagram.com/santaarmonia/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: 'var(--spa-shadow-soft)'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "jsx-842adc9253c4654e",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                                            className: "jsx-842adc9253c4654e"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 191,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/Footer.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://www.facebook.com/p/Santa-Armonia-100071553266304/",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: 'var(--spa-shadow-soft)'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "jsx-842adc9253c4654e",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                                            className: "jsx-842adc9253c4654e"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/Footer.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://wa.me/573157274521?text=Hola%20quiero%20más%20información%20de%20Santa%20Armonía",
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: 'rgba(255, 255, 255, 0.3)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        boxShadow: 'var(--spa-shadow-soft)'
                                    },
                                    onMouseEnter: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    },
                                    onMouseLeave: (e)=>{
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "18",
                                        height: "18",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        className: "jsx-842adc9253c4654e",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488",
                                            className: "jsx-842adc9253c4654e"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/components/Footer.tsx",
                                        lineNumber: 236,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 217,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/Footer.tsx",
                            lineNumber: 166,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/Footer.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: columnsRef,
                    style: {
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: '0 var(--spa-spacing-lg)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spa-spacing-xl)',
                        marginBottom: 'var(--spa-spacing-xl)',
                        opacity: isColumnsVisible ? 1 : 0,
                        transform: isColumnsVisible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'all 0.8s ease-out'
                    },
                    className: "jsx-842adc9253c4654e",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none'
                            },
                            className: "jsx-842adc9253c4654e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: 'var(--spa-light)',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: 'var(--spa-spacing-lg)',
                                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                                        paddingBottom: 'var(--spa-spacing-sm)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: "Canales de Atención"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 264,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 'var(--spa-spacing-lg)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Contáctenos"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 276,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "📞 WhatsApp: 301-536-1106"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "📧 Email: info@santaarmonia.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🕐 Atención: Lunes a Sábado"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 291,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "⏰ Horario: 8:00 AM - 6:00 PM"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 275,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Visítenos"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 297,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "📍 Calle Principal #123"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🏢 Manizales - Caldas"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🚗 Estacionamiento disponible"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "♿ Acceso para personas con movilidad reducida"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 305,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 296,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/Footer.tsx",
                            lineNumber: 261,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
                            },
                            className: "jsx-842adc9253c4654e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: 'var(--spa-light)',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: 'var(--spa-spacing-lg)',
                                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                                        paddingBottom: 'var(--spa-spacing-sm)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: "Información Legal"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 322,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 'var(--spa-spacing-lg)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Políticas"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 334,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    },
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "📄 Política de privacidad ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    },
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "📋 Términos y condiciones ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px'
                                                    },
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🛡️ Política de cancelación ↗"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 353,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 342,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 333,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Certificaciones"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 360,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "✅ Certificado de sanidad"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 373,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "✅ Licencia comercial"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 374,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "✅ Terapeutas certificados"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 375,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "✅ Productos autorizados"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 376,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 368,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 359,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/Footer.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                animation: isColumnsVisible ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
                            },
                            className: "jsx-842adc9253c4654e",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    style: {
                                        color: 'var(--spa-light)',
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        marginBottom: 'var(--spa-spacing-lg)',
                                        borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                                        paddingBottom: 'var(--spa-spacing-sm)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: "Servicios y Pagos"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 'var(--spa-spacing-lg)'
                                    },
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Tratamientos"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 397,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "💆‍♀️ Masajes terapéuticos"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 410,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🧖‍♀️ Tratamientos faciales"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "💆‍♂️ Terapias corporales"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 412,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "🎁 Paquetes especiales"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 413,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 405,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-842adc9253c4654e",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: 'bold',
                                                marginBottom: 'var(--spa-spacing-sm)'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: "Medios de Pago"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 418,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                color: '#2C3E50',
                                                fontSize: '14px',
                                                lineHeight: '1.6'
                                            },
                                            className: "jsx-842adc9253c4654e",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '4px'
                                                    },
                                                    className: "jsx-842adc9253c4654e",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: "/images/davivienda.png",
                                                            alt: "Davivienda",
                                                            style: {
                                                                width: '20px',
                                                                height: '20px'
                                                            },
                                                            className: "jsx-842adc9253c4654e"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/Footer.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-842adc9253c4654e",
                                                            children: "4884-0445-0337"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/Footer.tsx",
                                                            lineNumber: 433,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 431,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        marginBottom: '4px'
                                                    },
                                                    className: "jsx-842adc9253c4654e",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: "/images/nequi.png",
                                                            alt: "Nequi",
                                                            style: {
                                                                width: '20px',
                                                                height: '20px'
                                                            },
                                                            className: "jsx-842adc9253c4654e"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/Footer.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jsx-842adc9253c4654e",
                                                            children: "313-621-1447"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/components/Footer.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "💳 Efectivo"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 439,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-842adc9253c4654e",
                                                    children: "💳 Tarjetas débito/crédito"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/components/Footer.tsx",
                                                    lineNumber: 440,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/components/Footer.tsx",
                                            lineNumber: 426,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/components/Footer.tsx",
                                    lineNumber: 417,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/components/Footer.tsx",
                            lineNumber: 382,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/components/Footer.tsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: copyrightRef,
                    style: {
                        textAlign: 'center',
                        padding: 'var(--spa-spacing-lg) var(--spa-spacing-lg) 0 var(--spa-spacing-lg)',
                        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#2C3E50',
                        fontSize: '14px',
                        fontWeight: '500',
                        opacity: isCopyrightVisible ? 1 : 0,
                        transform: isCopyrightVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s ease-out'
                    },
                    className: "jsx-842adc9253c4654e",
                    children: "© 2025 | Todos los derechos reservados | Santa Armonía Facial & Corporal"
                }, void 0, false, {
                    fileName: "[project]/src/app/components/Footer.tsx",
                    lineNumber: 447,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/components/Footer.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/components/Footer.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__ef14e174._.js.map