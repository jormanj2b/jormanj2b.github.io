/* JB Studio public quote catalog. USD starting prices for limited scope; no backend credentials. */
(function(g){'use strict';const catalog={
  "types": [
    [
      "landing",
      "Landing page",
      "Landing page",
      -1,
      false,
      220,
      "Landing express de una página, hasta 5 secciones, formulario básico; sin CMS ni hosting comercial.",
      "Express one-page site, up to 5 sections, basic form; no CMS or commercial hosting."
    ],
    [
      "corporate",
      "Web corporativa",
      "Business website",
      0,
      false
    ],
    [
      "catalog",
      "Catálogo digital",
      "Digital catalog",
      -1,
      false,
      290,
      "Catálogo inicial de hasta 15 productos, contenido suministrado y contacto; sin carrito ni panel.",
      "Starter catalog of up to 15 supplied products and contact; no cart or dashboard."
    ],
    [
      "store",
      "Tienda online",
      "Online store",
      -1,
      false,
      590,
      "Tienda inicial basada en plataforma compatible, hasta 15 productos y carrito; pagos, inventario avanzado y licencias aparte.",
      "Starter store on a compatible platform, up to 15 products and cart; payments, advanced stock and licenses separate."
    ],
    [
      "system",
      "Sistema a medida",
      "Custom system",
      -1,
      false,
      850,
      "Sistema piloto de un proceso y alcance limitado; no equivale a un ERP completo.",
      "Pilot system for one limited-scope process; not a full ERP."
    ],
    [
      "automation",
      "Automatización independiente",
      "Standalone automation",
      -1,
      false
    ],
    [
      "chatbot",
      "Chatbot empresarial",
      "Business chatbot",
      -1,
      false,
      180,
      "Asistente web básico de preguntas frecuentes con una fuente de información; consumo, infraestructura y canales adicionales aparte.",
      "Basic web FAQ assistant with one knowledge source; usage, infrastructure and additional channels separate."
    ],
    [
      "existing",
      "Ampliar mi web actual",
      "Extend my existing website",
      -1,
      false
    ]
  ],
  "categories": [
    [
      "sales",
      "Clientes y ventas",
      "Customers & sales"
    ],
    [
      "admin",
      "Administración",
      "Administration"
    ],
    [
      "finance",
      "Pagos y finanzas",
      "Payments & finance"
    ],
    [
      "integrations",
      "Integraciones",
      "Integrations"
    ],
    [
      "automation",
      "Automatizaciones",
      "Automation"
    ],
    [
      "ai",
      "Inteligencia artificial",
      "Artificial intelligence"
    ],
    [
      "infra",
      "Infraestructura",
      "Infrastructure"
    ],
    [
      "growth",
      "Crecimiento digital",
      "Digital growth"
    ]
  ],
  "modules": [
    [
      "crm",
      "sales",
      "CRM de clientes",
      "Customer CRM",
      "Contactos, etiquetas y seguimiento básico.",
      "Contacts, tags and basic follow-up.",
      "addon",
      150
    ],
    [
      "booking",
      "sales",
      "Reservas y citas",
      "Appointment booking",
      "Agenda, disponibilidad y solicitudes de cita.",
      "Calendar, availability and booking requests.",
      "addon",
      130
    ],
    [
      "orders",
      "sales",
      "Gestión de pedidos",
      "Order management",
      "Registro y estados de pedidos.",
      "Order records and status tracking.",
      "addon",
      160
    ],
    [
      "cart",
      "sales",
      "Carrito de compras",
      "Shopping cart",
      "Carrito básico; no incluye pasarela ni impuestos.",
      "Basic cart; excludes payment gateway and tax logic.",
      "addon",
      120
    ],
    [
      "whatsapp-link",
      "sales",
      "Pedidos por WhatsApp",
      "WhatsApp orders",
      "Envía un resumen de pedido a un número del negocio.",
      "Send an order summary to the business number.",
      "addon",
      45
    ],
    [
      "dashboard",
      "admin",
      "Panel administrativo",
      "Admin dashboard",
      "Gestión básica de contenido y registros; alcance acordado.",
      "Basic content and record management; agreed scope.",
      "addon",
      180
    ],
    [
      "inventory",
      "admin",
      "Inventario",
      "Inventory",
      "Productos, existencias y movimientos básicos.",
      "Products, stock and basic movements.",
      "addon",
      160
    ],
    [
      "roles",
      "admin",
      "Usuarios y permisos",
      "Users & permissions",
      "Autenticación y roles básicos; revisión de seguridad.",
      "Authentication and basic roles; security review.",
      "addon",
      130
    ],
    [
      "excel",
      "admin",
      "Importación de Excel / CSV",
      "Excel / CSV import",
      "Un formato de archivo y validación de registros.",
      "One file format and record validation.",
      "addon",
      75
    ],
    [
      "reports",
      "admin",
      "Reportes y estadísticas",
      "Reports & statistics",
      "Resumen de métricas acordadas.",
      "Summary of agreed metrics.",
      "addon",
      110
    ],
    [
      "audit-log",
      "admin",
      "Auditoría de acciones",
      "Activity audit log",
      "Registro de acciones administrativas.",
      "Log of administrative actions.",
      "addon",
      90
    ],
    [
      "stripe",
      "finance",
      "Stripe",
      "Stripe",
      "Una pasarela compatible, cuenta elegible del cliente; comisiones y validación aparte.",
      "One compatible gateway, eligible client account; fees and verification separate.",
      "addon",
      120
    ],
    [
      "paypal",
      "finance",
      "PayPal",
      "PayPal",
      "Una integración básica, sujeta a país y cuenta comercial; comisiones aparte.",
      "One basic integration, subject to country and merchant account; fees separate.",
      "addon",
      120
    ],
    [
      "invoicing",
      "finance",
      "Facturación digital",
      "Digital invoicing",
      "Proveedor autorizado y normativa del país.",
      "Authorized provider and local regulations.",
      "custom",
      null
    ],
    [
      "rates",
      "finance",
      "Tasa BCV / USDT",
      "BCV / USDT rates",
      "Una fuente de cambio compatible, sin garantía de disponibilidad; reglas y validación acordadas.",
      "One compatible exchange-rate source, no uptime guarantee; agreed rules and validation.",
      "addon",
      85
    ],
    [
      "currencies",
      "finance",
      "Precios en varias monedas",
      "Multi-currency prices",
      "Visualización de precios en dos monedas; no incluye conversión en el cobro.",
      "Price display in two currencies; excludes payment conversion.",
      "addon",
      70
    ],
    [
      "calendar",
      "integrations",
      "Google Calendar",
      "Google Calendar",
      "Sincronización sencilla de eventos.",
      "Simple event synchronization.",
      "flow",
      null
    ],
    [
      "sheets",
      "integrations",
      "Google Sheets",
      "Google Sheets",
      "Registro de solicitudes o pedidos en una hoja.",
      "Record inquiries or orders in a sheet.",
      "flow",
      null
    ],
    [
      "wordpress",
      "integrations",
      "WordPress / WooCommerce",
      "WordPress / WooCommerce",
      "Conexión básica con un plugin o sitio compatible; licencias y migraciones aparte.",
      "Basic connection to one compatible plugin or site; licenses and migrations separate.",
      "addon",
      100
    ],
    [
      "supabase",
      "integrations",
      "Supabase / PostgreSQL",
      "Supabase / PostgreSQL",
      "Base de datos, autenticación y políticas de acceso.",
      "Database, authentication and access policies.",
      "custom",
      null
    ],
    [
      "api",
      "integrations",
      "API externa",
      "External API",
      "Una integración sencilla con API documentada; permisos y costes de uso aparte.",
      "One simple documented API integration; permissions and usage costs separate.",
      "addon",
      120
    ],
    [
      "email",
      "automation",
      "Confirmaciones por correo",
      "Email confirmations",
      "Aviso al recibir una solicitud o pedido.",
      "Notice when a request or order arrives.",
      "flow",
      null
    ],
    [
      "reminders",
      "automation",
      "Recordatorios de citas",
      "Appointment reminders",
      "Avisos programados antes de una cita.",
      "Scheduled notices before appointments.",
      "flow",
      null
    ],
    [
      "alerts",
      "automation",
      "Avisos internos",
      "Internal alerts",
      "Notificación sencilla o resumen al equipo.",
      "Simple team notification or summary.",
      "flow",
      null
    ],
    [
      "whatsapp-api",
      "automation",
      "WhatsApp Business API",
      "WhatsApp Business API",
      "Configuración básica de un flujo oficial con cuenta elegible; plantillas, consentimiento y tarifas de Meta aparte.",
      "Basic setup of one official workflow with an eligible account; templates, consent and Meta fees separate.",
      "addon",
      150
    ],
    [
      "n8n",
      "automation",
      "Flujos personalizados con n8n",
      "Custom n8n workflows",
      "Un flujo personalizado sencillo en una instancia compatible; hosting y licencias aparte.",
      "One simple custom workflow on a compatible instance; hosting and licenses separate.",
      "addon",
      150
    ],
    [
      "chatbot",
      "ai",
      "Chatbot empresarial",
      "Business chatbot",
      "Asistente web básico de preguntas frecuentes; consumo, hosting y canales adicionales aparte.",
      "Basic web FAQ assistant; usage, hosting and additional channels separate.",
      "addon",
      180
    ],
    [
      "documents",
      "ai",
      "Asistente de documentos",
      "Document assistant",
      "Consulta básica de un conjunto limitado de documentos autorizados; consumo y almacenamiento aparte.",
      "Basic search over a limited set of authorized documents; usage and storage separate.",
      "addon",
      250
    ],
    [
      "classify",
      "ai",
      "Clasificación de solicitudes",
      "Inquiry classification",
      "Un flujo sencillo de clasificación con revisión humana; consumo del modelo aparte.",
      "One simple classification workflow with human review; model usage separate.",
      "addon",
      120
    ],
    [
      "hosting",
      "infra",
      "Hosting / backend",
      "Hosting / backend",
      "Proveedor, capacidad y costes mensuales por definir.",
      "Provider, capacity and monthly costs to be agreed.",
      "custom",
      null
    ],
    [
      "domain",
      "infra",
      "Dominio y SSL",
      "Domain & SSL",
      "Configuración independiente de dominio y SSL compatible; registro, renovación y alojamiento aparte.",
      "Standalone compatible domain and SSL setup; registration, renewal and hosting separate.",
      "addon",
      35
    ],
    [
      "backups",
      "infra",
      "Copias de seguridad",
      "Backups",
      "Configuración básica de copias en un entorno compatible; almacenamiento recurrente aparte.",
      "Basic backup setup in a compatible environment; recurring storage separate.",
      "addon",
      70
    ],
    [
      "seo",
      "growth",
      "Auditoría digital básica",
      "Basic website audit",
      "Revisión de un sitio público; informe de recomendaciones.",
      "Review one public website; recommendations report.",
      "fixed",
      30
    ],
    [
      "research",
      "growth",
      "Prospección B2B inicial",
      "Starter B2B research",
      "50 prospectos investigados, fuentes y 10 borradores; sin envíos.",
      "50 researched leads, sources and 10 drafts; no sending.",
      "fixed",
      75
    ]
  ],
  "presets": [
    [
      "Panadería",
      "Bakery",
      "catalog",
      [
        "orders",
        "whatsapp-link",
        "inventory"
      ]
    ],
    [
      "Barbería",
      "Barbershop",
      "corporate",
      [
        "booking",
        "crm",
        "reminders"
      ]
    ],
    [
      "Cafetería",
      "Coffee shop",
      "catalog",
      [
        "orders",
        "dashboard",
        "inventory"
      ]
    ],
    [
      "Tienda",
      "Shop",
      "store",
      [
        "inventory",
        "orders",
        "stripe"
      ]
    ],
    [
      "Servicios profesionales",
      "Professional services",
      "corporate",
      [
        "crm",
        "booking",
        "email"
      ]
    ],
    [
      "Gimnasio",
      "Gym",
      "corporate",
      [
        "crm",
        "booking",
        "reminders"
      ]
    ]
  ]
};
function calculate(config,catalog,prices){
 const type=catalog.types.find(t=>t[0]===config.type);
 if(!type)throw Error("Invalid type");
 const webIndex=type[3]>=0?config.web:-1;
 const base=webIndex>=0?prices.web[webIndex]:(type[5]||0);
 const selected=new Set(config.modules),lines=[],pending=[],included=[],flow=[];
 if(type[4])pending.push("base:"+type[0]);
 for(const m of catalog.modules){
  if(!selected.has(m[0]))continue;
  const [id,,,,,,mode,price]=m;
  if((type[0]==="chatbot"&&id==="chatbot")||(type[0]==="store"&&id==="cart")||(webIndex>=0&&id==="domain")||(webIndex===2&&["dashboard","booking"].includes(id))){included.push(id);continue;}
  if(mode==="flow")flow.push(id);
  else if(mode==="custom")pending.push(id);
  else lines.push({id,price,provisional:mode==="addon"});
 }
 const tier=flow.length===0?(type[0]==="automation"?0:-1):flow.length===1?0:flow.length<=3?1:2;
 const automation=tier<0?0:prices.automation[tier];
 const recurring=webIndex>=0&&config.care>=0?prices.maintenance[config.care]:0;
 return {webIndex,base,lines,pending,included,flow,tier,automation,recurring,total:base+automation+lines.reduce((s,l)=>s+l.price,0)};
}
g.JBProjectCatalog={...catalog,calculate};})(window);
