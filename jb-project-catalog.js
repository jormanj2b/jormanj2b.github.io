/* JB Studio: reusable quote catalog, not production backend modules. Add-on amounts are proposed starting prices. */
(function(g){'use strict';const catalog={
  "types": [
    [
      "landing",
      "Landing page",
      "Landing page",
      0,
      false
    ],
    [
      "corporate",
      "Web corporativa",
      "Business website",
      1,
      false
    ],
    [
      "catalog",
      "Catálogo digital",
      "Digital catalog",
      1,
      false
    ],
    [
      "store",
      "Tienda online",
      "Online store",
      -1,
      true
    ],
    [
      "system",
      "Sistema a medida",
      "Custom system",
      -1,
      true
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
      true
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
      180
    ],
    [
      "booking",
      "sales",
      "Reservas y citas",
      "Appointment booking",
      "Agenda, disponibilidad y solicitudes de cita.",
      "Calendar, availability and booking requests.",
      "addon",
      180
    ],
    [
      "orders",
      "sales",
      "Gestión de pedidos",
      "Order management",
      "Registro y estados de pedidos.",
      "Order records and status tracking.",
      "addon",
      200
    ],
    [
      "cart",
      "sales",
      "Carrito de compras",
      "Shopping cart",
      "Carrito básico; no incluye pasarela ni impuestos.",
      "Basic cart; excludes payment gateway and tax logic.",
      "addon",
      150
    ],
    [
      "whatsapp-link",
      "sales",
      "Pedidos por WhatsApp",
      "WhatsApp orders",
      "Envía un resumen de pedido a un número del negocio.",
      "Send an order summary to the business number.",
      "addon",
      60
    ],
    [
      "dashboard",
      "admin",
      "Panel administrativo",
      "Admin dashboard",
      "Gestión básica de contenido y registros; alcance acordado.",
      "Basic content and record management; agreed scope.",
      "addon",
      220
    ],
    [
      "inventory",
      "admin",
      "Inventario",
      "Inventory",
      "Productos, existencias y movimientos básicos.",
      "Products, stock and basic movements.",
      "addon",
      220
    ],
    [
      "roles",
      "admin",
      "Usuarios y permisos",
      "Users & permissions",
      "Autenticación y roles básicos; revisión de seguridad.",
      "Authentication and basic roles; security review.",
      "addon",
      180
    ],
    [
      "excel",
      "admin",
      "Importación de Excel / CSV",
      "Excel / CSV import",
      "Un formato de archivo y validación de registros.",
      "One file format and record validation.",
      "addon",
      90
    ],
    [
      "reports",
      "admin",
      "Reportes y estadísticas",
      "Reports & statistics",
      "Resumen de métricas acordadas.",
      "Summary of agreed metrics.",
      "addon",
      150
    ],
    [
      "audit-log",
      "admin",
      "Auditoría de acciones",
      "Activity audit log",
      "Registro de acciones administrativas.",
      "Log of administrative actions.",
      "addon",
      120
    ],
    [
      "stripe",
      "finance",
      "Stripe",
      "Stripe",
      "Pasarela sujeta a elegibilidad y cuenta del cliente.",
      "Gateway subject to eligibility and client account.",
      "custom",
      null
    ],
    [
      "paypal",
      "finance",
      "PayPal",
      "PayPal",
      "Integración según país y cuenta comercial.",
      "Integration subject to country and merchant account.",
      "custom",
      null
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
      "Actualización desde fuentes verificadas; política de conversión acordada.",
      "Updates from verified sources; agreed conversion policy.",
      "custom",
      null
    ],
    [
      "currencies",
      "finance",
      "Precios en varias monedas",
      "Multi-currency prices",
      "Visualización y conversión según fuente y alcance.",
      "Display and conversion subject to source and scope.",
      "custom",
      null
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
      "Conexión con sitio existente y plugins compatibles.",
      "Connect an existing site and compatible plugins.",
      "custom",
      null
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
      "Conexión según documentación, permisos y límites.",
      "Connection subject to documentation, permissions and limits.",
      "custom",
      null
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
      "Mensajes con consentimiento y plantillas aprobadas.",
      "Messages with consent and approved templates.",
      "custom",
      null
    ],
    [
      "n8n",
      "automation",
      "Flujos personalizados con n8n",
      "Custom n8n workflows",
      "Procesos de varias etapas y servicios externos.",
      "Multi-step processes and external services.",
      "custom",
      null
    ],
    [
      "chatbot",
      "ai",
      "Chatbot empresarial",
      "Business chatbot",
      "Implementación, límites y fuentes de información acordados.",
      "Implementation, limits and knowledge sources agreed.",
      "custom",
      null
    ],
    [
      "documents",
      "ai",
      "Asistente de documentos",
      "Document assistant",
      "Consulta de documentos autorizados y control de acceso.",
      "Query authorized documents with access controls.",
      "custom",
      null
    ],
    [
      "classify",
      "ai",
      "Clasificación de solicitudes",
      "Inquiry classification",
      "Extracción o clasificación con revisión humana.",
      "Extraction or classification with human review.",
      "custom",
      null
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
      "Renovación y costes del proveedor por separado.",
      "Renewals and provider costs separate.",
      "custom",
      null
    ],
    [
      "backups",
      "infra",
      "Copias de seguridad",
      "Backups",
      "Frecuencia, retención y recuperación por definir.",
      "Frequency, retention and recovery to be agreed.",
      "custom",
      null
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
 const base=webIndex>=0?prices.web[webIndex]:0;
 const selected=new Set(config.modules);
 const lines=[],pending=[],included=[],flow=[];
 if(type[4])pending.push(type[0]==="chatbot"?"chatbot":"base:"+type[0]);
 for(const m of catalog.modules){
  if(!selected.has(m[0]))continue;
  const [id,,,,,,mode,price]=m;
  if(type[0]==="chatbot"&&id==="chatbot"){included.push(id);continue;}
  if(webIndex===2&&["dashboard","booking"].includes(id)){included.push(id);continue;}
  if(mode==="flow")flow.push(id);
  else if(mode==="custom")pending.push(id);
  else lines.push({id,price,provisional:mode==="addon"});
 }
 const tier=flow.length===0?-1:flow.length===1?0:flow.length<=3?1:2;
 const automation=tier<0?0:prices.automation[tier];
 const recurring=webIndex>=0&&config.care>=0?prices.maintenance[config.care]:0;
 return {webIndex,base,lines,pending,included,flow,tier,automation,recurring,total:base+automation+lines.reduce((s,l)=>s+l.price,0)};
}
g.JBProjectCatalog={...catalog,calculate};})(window);
