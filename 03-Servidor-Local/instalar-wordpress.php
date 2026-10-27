<?php
/**
 * Instalador local de WordPress para el Proyecto Final 2.0
 * ---------------------------------------------------------
 * Se ejecuta con:  php instalar-wordpress.php
 *
 * Hace todo sin pantallas ni clics:
 *   1. Crea wp-config.php (base de datos SQLite, sin MySQL).
 *   2. Instala WordPress si todavía no existe.
 *   3. Configura enlaces permanentes, zona horaria, comentarios cerrados.
 *   4. Activa el tema Astra y los plugins (Rank Math, UpdraftPlus, Wordfence).
 *   5. Crea el menú, las categorías, tres entradas y la portada con el estilo del salón.
 *
 * Se puede ejecutar varias veces: no duplica contenido.
 */

$RAIZ    = dirname(__DIR__);
$WP      = $RAIZ . DIRECTORY_SEPARATOR . '02-WordPress';
$CONFIG  = $WP . DIRECTORY_SEPARATOR . 'wp-config.php';
$CLAVE   = $WP . DIRECTORY_SEPARATOR . 'CLAVE-ADMIN-LOCAL.txt';
$USUARIO = 'girlys_admin';
$CORREO  = 'admin@girlys.local';
$TITULO  = 'Girlys · Blog de manicura y cuidado de uñas';

function azar(int $largo = 32): string
{
    return substr(str_replace(['/', '+', '='], '', base64_encode(random_bytes($largo))), 0, 44);
}

function paso(string $texto): void
{
    echo '  [ok] ' . $texto . PHP_EOL;
}

/* ---------------------------------------------------------------- 1. config */
if (!file_exists($CONFIG)) {
    $dbPath = str_replace('\\', '/', $RAIZ . '/03-Servidor-Local/datos/wordpress.sqlite');
    if (!is_dir(dirname($dbPath))) {
        mkdir(dirname($dbPath), 0777, true);
    }

    $sal = '';
    foreach (['AUTH_KEY', 'SECURE_AUTH_KEY', 'LOGGED_IN_KEY', 'NONCE_KEY', 'AUTH_SALT', 'SECURE_AUTH_SALT', 'LOGGED_IN_SALT', 'NONCE_SALT'] as $nombre) {
        $sal .= "define('{$nombre}', '" . azar() . "');\n";
    }

    $plantilla = "<?php\n"
        . "// Generado automáticamente por instalar-wordpress.php\n"
        . "// Base de datos SQLite: no necesita MySQL ni contraseñas de base de datos.\n\n"
        . "define('DB_NAME', 'girlys_local');\n"
        . "define('DB_USER', 'local');\n"
        . "define('DB_PASSWORD', 'local');\n"
        . "define('DB_HOST', 'localhost');\n"
        . "define('DB_CHARSET', 'utf8mb4');\n"
        . "define('DB_COLLATE', '');\n"
        . "define('DB_ENGINE', 'sqlite');\n"
        . "define('DB_PATH', '" . $dbPath . "');\n\n"
        . "\$table_prefix = 'wp_';\n\n"
        . "// Dirección pública del blog dentro del servidor local.\n"
        . "define('WP_HOME', 'https://localhost:8443/blog');\n"
        . "define('WP_SITEURL', 'https://localhost:8443/blog');\n\n"
        . $sal . "\n"
        . "define('WP_DEBUG', false);\n"
        . "define('WP_DEBUG_DISPLAY', false);\n"
        . "define('DISALLOW_FILE_EDIT', true);\n"
        . "define('AUTOMATIC_UPDATER_DISABLED', true);\n"
        . "define('WP_MEMORY_LIMIT', '256M');\n\n"
        . "if (!defined('ABSPATH')) {\n    define('ABSPATH', __DIR__ . '/');\n}\n\n"
        . "require_once ABSPATH . 'wp-settings.php';\n";

    file_put_contents($CONFIG, $plantilla);
    paso('wp-config.php creado (SQLite en 03-Servidor-Local/datos/wordpress.sqlite)');
} else {
    paso('wp-config.php ya existía, se conserva');
}

// Drop-in de SQLite: hace que WordPress use el archivo .sqlite en vez de MySQL.
$dropin = $WP . DIRECTORY_SEPARATOR . 'wp-content' . DIRECTORY_SEPARATOR . 'db.php';
if (!file_exists($dropin)) {
    copy($WP . '/wp-content/plugins/sqlite-database-integration/db.copy', $dropin);
    paso('Conector SQLite instalado (wp-content/db.php)');
}

// Estilo del blog: vive en 03-Servidor-Local/recursos y se copia a WordPress.
// Así el repositorio de Git puede excluir la carpeta completa de WordPress
// sin perder la personalización del tema.
$muDir     = $WP . '/wp-content/mu-plugins';
$muOrigen  = __DIR__ . '/recursos/girlys-estilo.php';
$muDestino = $muDir . '/girlys-estilo.php';
if (!is_dir($muDir)) {
    mkdir($muDir, 0777, true);
}
if (file_exists($muOrigen)) {
    copy($muOrigen, $muDestino);
    paso('Estilo del blog aplicado (mu-plugin)');
}

/* ------------------------------------------------------------- 2. cargar WP */define('WP_INSTALLING', true);
$_SERVER['HTTP_HOST']      = 'localhost:8443';
$_SERVER['SERVER_NAME']    = 'localhost';
$_SERVER['SERVER_PORT']    = '8443';
$_SERVER['REQUEST_URI']    = '/blog/';
$_SERVER['SCRIPT_NAME']    = '/blog/index.php';
$_SERVER['PHP_SELF']       = '/blog/index.php';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['HTTPS']          = 'on';

require_once $WP . '/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/upgrade.php';
require_once ABSPATH . 'wp-admin/includes/plugin.php';
require_once ABSPATH . 'wp-admin/includes/post.php';
require_once ABSPATH . 'wp-admin/includes/nav-menu.php';

/* --------------------------------------------------- 3. instalar si hace falta */
if (!is_blog_installed()) {
    $clave = 'Girlys-' . azar(8) . '-Local!';
    $datos = wp_install($TITULO, $USUARIO, $CORREO, false, '', $clave, 'es_ES');

    file_put_contents(
        $CLAVE,
        "ACCESO AL PANEL DE WORDPRESS (SOLO EN ESTA PC)\r\n"
        . "==============================================\r\n\r\n"
        . "URL:       https://localhost:8443/blog/wp-admin/\r\n"
        . "Usuario:   {$USUARIO}\r\n"
        . "Contraseña: {$clave}\r\n\r\n"
        . "Este archivo es privado. No lo subas a GitHub ni lo compartas.\r\n"
    );
    paso('WordPress instalado. Usuario: ' . $USUARIO);
} else {
    paso('WordPress ya estaba instalado, no se toca');
}

wp_set_current_user(1);

/* --------------------------------------------------------- 4. configuración */
update_option('blogname', $TITULO);
update_option('blogdescription', 'Consejos de manicura, tendencias y precios claros en Santa Cruz de la Sierra');
update_option('timezone_string', 'America/La_Paz');
update_option('date_format', 'd/m/Y');
update_option('time_format', 'H:i');
update_option('start_of_week', 1);
update_option('blog_public', 0); // local: que Google no lo indexe todavía
update_option('default_comment_status', 'closed');
update_option('default_ping_status', 'closed');
update_option('default_pingback_flag', 0);
update_option('close_comments_for_old_posts', 1);
update_option('require_name_email', 1);
update_option('thread_comments', 0);
paso('Título, zona horaria, comentarios cerrados y visibilidad de buscadores');

// Enlaces permanentes bonitos: /blog/mi-entrada/
global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules(false);
paso('Enlaces permanentes: /blog/nombre-de-la-entrada/');

// Ajustes del editor y medios
update_option('thumbnail_size_w', 900);
update_option('thumbnail_crop', 1);
update_option('uploads_use_yearmonth_folders', 0);
paso('Tamaño de imágenes y organización de medios');

// Idioma del panel: español de Bolivia/España (es_ES).
require_once ABSPATH . 'wp-admin/includes/translation-install.php';
$traducciones = wp_get_available_translations();
if (isset($traducciones['es_ES'])) {
    $descargado = wp_download_language_pack('es_ES');
    if ($descargado) {
        update_option('WPLANG', 'es_ES');
        paso('Idioma del panel cambiado a español (es_ES)');
    } else {
        echo '  [--] No se pudo descargar el paquete de español (¿sin internet?)' . PHP_EOL;
    }
}

/* ------------------------------------------------- 5. tema y plugins */
switch_theme('astra');
paso('Tema activo: Astra (gratis)');

$plugins = [
    'seo-by-rank-math/rank-math.php'      => 'Rank Math SEO',
    'updraftplus/updraftplus.php'         => 'UpdraftPlus (copias de seguridad)',
    'wordfence/wordfence.php'             => 'Wordfence (seguridad)',
];

foreach ($plugins as $archivo => $nombre) {
    if (is_plugin_active($archivo)) {
        paso($nombre . ' ya estaba activo');
        continue;
    }
    $ruta = WP_PLUGIN_DIR . '/' . $archivo;
    if (!file_exists($ruta)) {
        echo '  [--] Falta el archivo del plugin ' . $archivo . PHP_EOL;
        continue;
    }
    $error = activate_plugin($archivo, '', false, true);
    if (is_wp_error($error)) {
        echo '  [--] No se pudo activar ' . $nombre . ': ' . $error->get_error_message() . PHP_EOL;
    } else {
        paso($nombre . ' activado');
    }
}

/* ---------------------------------------------------------- 6. contenido */
// Borrar el contenido de ejemplo.
$ejemplo = get_page_by_path('sample-page');
if ($ejemplo) {
    wp_delete_post($ejemplo->ID, true);
    paso('Página de ejemplo eliminada');
}

$hola = get_posts([
    'name'           => 'hello-world',
    'post_type'      => 'post',
    'post_status'    => 'any',
    'posts_per_page' => 1,
    'fields'         => 'ids',
]);
foreach ($hola as $idHola) {
    wp_delete_post($idHola, true);
    paso('Entrada de ejemplo eliminada');
}

// Comentario de ejemplo.
$comentario = get_comment(1);
if ($comentario) {
    wp_delete_comment(1, true);
}

// La categoría "Uncategorized" sobra si ya está vacía.
$sinCategoria = get_term_by('slug', 'uncategorized', 'category');
if ($sinCategoria && (int) $sinCategoria->count === 0) {
    wp_delete_term($sinCategoria->term_id, 'category');
    paso('Categoría "Uncategorized" eliminada');
}

// "Hello Dolly" no aporta nada al proyecto.
if (file_exists(WP_PLUGIN_DIR . '/hello.php')) {
    delete_plugins(['hello.php']);
    paso('Plugin de ejemplo "Hello Dolly" eliminado');
}

// Categorías.
$categorias = [];
foreach (['Cuidado de uñas', 'Tendencias', 'Paso a paso'] as $nombreCategoria) {
    $existe = get_term_by('name', $nombreCategoria, 'category');
    if ($existe) {
        $categorias[$nombreCategoria] = (int) $existe->term_id;
    } else {
        $creada = wp_insert_term($nombreCategoria, 'category');
        if (!is_wp_error($creada)) {
            $categorias[$nombreCategoria] = (int) $creada['term_id'];
        }
    }
}
paso('Categorías: ' . implode(', ', array_keys($categorias)));

// Entradas de ejemplo con contenido real (sin datos inventados de terceros).
$entradas = [
    [
        'titulo'    => 'Cómo cuidar la manicura semipermanente para que dure más',
        'categoria' => 'Cuidado de uñas',
        'resumen'   => 'Siete hábitos sencillos que alargan la vida del esmaltado sin dañar la uña natural.',
        'cuerpo'    => "El esmaltado semipermanente puede durar entre dos y tres semanas si se cuida. No hace falta cambiar toda la rutina: alcanza con pequeños ajustes.\n\n"
            . "## Los siete hábitos\n\n"
            . "1. Usa guantes para lavar platos y limpiar. El detergente reseca el borde y levanta el sellado.\n"
            . "2. No uses las uñas como herramienta: abre las latas con una cuchara, no con el pulgar.\n"
            . "3. Aplica aceite para cutículas todas las noches. La piel hidratada sostiene mejor el esmaltado.\n"
            . "4. Evita el acetona pura entre citas; si necesitas quitar esmalte, usa uno sin acetona.\n"
            . "5. Sécalas bien después de la piscina o el mar: la humedad prolongada ablanda la capa.\n"
            . "6. Lima solo los bordes despuntados, en una sola dirección y con lima fina.\n"
            . "7. Vuelve al salón si ves un desprendimiento. Retirar a tiempo evita arrancar capas de la uña.\n\n"
            . "> Regla simple: si una uña se engancha en el cabello, ya toca retirarla.\n\n"
            . "Si quieres saber cuánto sale tu combinación favorita, la calculadora del sitio principal muestra el total y el anticipo antes de reservar.",
    ],
    [
        'titulo'    => 'Francesa clásica: por qué nunca pasa de moda',
        'categoria' => 'Tendencias',
        'resumen'   => 'La media luna limpia sigue siendo el diseño más pedido, y tiene sentido.',
        'cuerpo'    => "La francesa clásica es la prueba de que lo simple funciona: una base natural y una media luna blanca en la punta.\n\n"
            . "## Por qué sigue vigente\n\n"
            . "Se ve limpia en cualquier largo, combina con todo y crece de forma discreta. Cuando la uña crece, el borde blanco sigue viéndose bien por unos días más que un color sólido.\n\n"
            . "## Cómo pedirla\n\n"
            . "Pide **francesa clásica con media luna fina**. Si tu uña es corta, conviene una línea algo más gruesa para que se note; si es larga, la línea fina alarga el dedo.\n\n"
            . "En el sitio principal la francesa clásica se suma al precio del servicio como diseño. La calculadora lo muestra antes de confirmar la cita, sin sorpresas al final.",
    ],
    [
        'titulo'    => 'Largo, forma y precio: cómo se calcula una manicura esculpida',
        'categoria' => 'Paso a paso',
        'resumen'   => 'Qué mira el salón antes de darte un precio: servicio, forma, largo y diseño.',
        'cuerpo'    => "Una manicura esculpida no cuesta lo mismo en todas las manos. El precio depende de cuatro cosas concretas:\n\n"
            . "## 1. El servicio\n\n"
            . "Manicura, pedicura, semipermanente o esculpida. Cada uno tiene su precio base.\n\n"
            . "## 2. La forma\n\n"
            . "Redonda, ovalada, almendra, cuadrada o stiletto. Las formas más trabajadas llevan más tiempo de limado.\n\n"
            . "## 3. El largo\n\n"
            . "Se mide en centímetros sobre la uña natural: corto, medio o largo. A más largo, más producto y más tiempo.\n\n"
            . "## 4. El diseño\n\n"
            . "Sin diseño, francesa clásica, nail art por uña o diseño personalizado. El diseño personalizado se cotiza aparte porque se dibuja a mano.\n\n"
            . "Con esos cuatro datos la calculadora del sitio da un total estimado y el anticipo del 50 %. El precio final se confirma en el salón, mirando la uña.",
    ],
];

$creadas = 0;
foreach ($entradas as $entrada) {
    $existeEntrada = get_posts([
        'title'          => $entrada['titulo'],
        'post_type'      => 'post',
        'post_status'    => 'any',
        'posts_per_page' => 1,
        'fields'         => 'ids',
    ]);
    if ($existeEntrada) {
        continue;
    }
    $id = wp_insert_post([
        'post_title'    => $entrada['titulo'],
        'post_content'  => $entrada['cuerpo'],
        'post_excerpt'  => $entrada['resumen'],
        'post_status'   => 'publish',
        'post_type'     => 'post',
        'post_author'   => 1,
        'post_category' => isset($categorias[$entrada['categoria']]) ? [$categorias[$entrada['categoria']]] : [],
    ]);
    if ($id && !is_wp_error($id)) {
        $creadas++;
    }
}
paso('Entradas publicadas: ' . $creadas . ' nuevas');

/* ------------------------------------------------------------ 7. portada */
$portada = get_page_by_path('inicio');
$htmlPortada = <<<'HTML'
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"4rem","bottom":"4rem","left":"1.25rem","right":"1.25rem"}}},"backgroundColor":"base","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-base-background-color has-background" style="padding-top:4rem;padding-right:1.25rem;padding-bottom:4rem;padding-left:1.25rem">
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center"><span class="girlys-etiqueta">Blog de uñas · Santa Cruz de la Sierra</span></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"3rem","lineHeight":"1.1"}}} -->
<h1 class="wp-block-heading has-text-align-center" style="font-size:3rem;line-height:1.1">Uñas cuidadas, ideas claras</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.12rem"}}} -->
<p class="has-text-align-center" style="font-size:1.12rem">Consejos de manicura, tendencias y precios transparentes.<br>Lo que ves es lo que pagas, sin sorpresas al final.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/">Ver servicios y reservar</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"2rem","bottom":"3rem","left":"1.25rem","right":"1.25rem"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull" style="padding-top:2rem;padding-right:1.25rem;padding-bottom:3rem;padding-left:1.25rem">
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Lo que más nos preguntan</h2>
<!-- /wp:heading -->

<!-- wp:columns -->
<div class="wp-block-columns">
<!-- wp:column -->
<div class="wp-block-column"><div class="girlys-tarjeta">
<h3>¿Cuánto cuesta?</h3>
<p>Manicura desde <span class="girlys-precio">55 Bs</span> y pedicura desde <span class="girlys-precio">90 Bs</span>. El total depende de la forma, el largo y el diseño.</p>
</div></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><div class="girlys-tarjeta">
<h3>¿Cómo reservo?</h3>
<p>Desde el sitio principal: eliges el servicio, ves el precio y el anticipo, y confirmas por WhatsApp.</p>
</div></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><div class="girlys-tarjeta">
<h3>¿Cada cuánto vuelvo?</h3>
<p>Cada 2 a 3 semanas en semipermanente. En esculpida, el retoque se hace según el crecimiento.</p>
</div></div>
<!-- /wp:column -->
</div>
<!-- /wp:columns -->
</div>
<!-- /wp:group -->

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"2rem","bottom":"3rem","left":"1.25rem","right":"1.25rem"}},"color":{"background":"#f6e3e7"}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:#f6e3e7;padding-top:2rem;padding-right:1.25rem;padding-bottom:3rem;padding-left:1.25rem">
<!-- wp:heading {"textAlign":"center","level":2} -->
<h2 class="wp-block-heading has-text-align-center">Últimas entradas</h2>
<!-- /wp:heading -->
<!-- wp:latest-posts {"postsToShow":3,"displayPostDate":true,"displayPostExcerpt":true,"displayFeaturedImage":false} /-->
</div>
<!-- /wp:group -->
HTML;

if (!$portada) {
    $idPortada = wp_insert_post([
        'post_title'   => 'Inicio',
        'post_name'    => 'inicio',
        'post_content' => $htmlPortada,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_author'  => 1,
    ]);
} else {
    $idPortada = $portada->ID;
}
paso('Página de inicio creada con el estilo del salón');

// Página que lista las entradas. Se llama "Blog" pero vive en /blog/entradas/
// para no quedar en la dirección fea /blog/blog/.
$paginaEntradas = get_page_by_path('entradas');
if ($paginaEntradas) {
    $idBlog = $paginaEntradas->ID;
} else {
    $idBlog = wp_insert_post([
        'post_title'   => 'Blog',
        'post_name'    => 'entradas',
        'post_content' => '',
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_author'  => 1,
    ]);
}

// Borrar duplicados de intentos anteriores (páginas con slug "blog").
foreach (get_posts(['post_type' => 'page', 'post_status' => 'any', 'numberposts' => 30]) as $posibleDuplicado) {
    if ($posibleDuplicado->post_name === 'blog' || str_starts_with($posibleDuplicado->post_name, 'entradas-')) {
        wp_delete_post($posibleDuplicado->ID, true);
    }
}

update_option('show_on_front', 'page');
update_option('page_on_front', $idPortada);
update_option('page_for_posts', $idBlog);
paso('Portada y página de entradas configuradas');

$servicios = get_page_by_path('servicios-y-precios');
if (!$servicios) {
    $htmlServicios = <<<'HTML'
<!-- wp:heading {"level":1} -->
<h1 class="wp-block-heading">Servicios y precios</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Precios de referencia en bolivianos (Bs). El total final se confirma en el salón según la forma, el largo y el diseño elegido. La calculadora del <a href="/">sitio principal</a> hace la cuenta por ti.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Servicio</th><th>Duración</th><th>Desde</th></tr></thead><tbody>
<tr><td>Manicura Express</td><td>45 min</td><td>55 Bs</td></tr>
<tr><td>Manicura Clásica</td><td>60 min</td><td>70 Bs</td></tr>
<tr><td>Manicura Spa</td><td>75 min</td><td>120 Bs</td></tr>
<tr><td>Manicura Semipermanente</td><td>90 min</td><td>130 Bs</td></tr>
<tr><td>Manicura Esculpida</td><td>150 min</td><td>200 Bs</td></tr>
<tr><td>Pedicura Clásica</td><td>60 min</td><td>90 Bs</td></tr>
<tr><td>Pedicura Spa</td><td>75 min</td><td>150 Bs</td></tr>
<tr><td>Pedicura Semipermanente</td><td>90 min</td><td>160 Bs</td></tr>
<tr><td>Pedicura Esculpida</td><td>150 min</td><td>230 Bs</td></tr>
</tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Diseños</h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul><li>Sin diseño: incluido.</li><li>Francesa clásica: +25 Bs.</li><li>Nail art por uña: +45 Bs (hasta 5 uñas).</li><li>Diseño personalizado a mano: +120 Bs.</li><li>Retiro de esmalte previo: +15 Bs.</li></ul>
<!-- /wp:list -->
HTML;

    wp_insert_post([
        'post_title'   => 'Servicios y precios',
        'post_name'    => 'servicios-y-precios',
        'post_content' => $htmlServicios,
        'post_status'  => 'publish',
        'post_type'    => 'page',
        'post_author'  => 1,
    ]);
    paso('Página "Servicios y precios" creada');
}

/* --------------------------------------------------------------- 8. menú */
$menuNombre = 'Menú principal';
$menu = wp_get_nav_menu_object($menuNombre);
if (!$menu) {
    $menuId = wp_create_nav_menu($menuNombre);
} else {
    $menuId = $menu->term_id;
}

// Se reconstruye siempre para que apunte a las páginas correctas.
foreach (wp_get_nav_menu_items($menuId) ?: [] as $item) {
    wp_delete_post($item->ID, true);
}

$paginas = [
    get_post($idPortada),
    get_post($idBlog),
    get_page_by_path('servicios-y-precios'),
];
foreach ($paginas as $pagina) {
    if (!$pagina) {
        continue;
    }
    wp_update_nav_menu_item($menuId, 0, [
        'menu-item-title'     => $pagina->post_title,
        'menu-item-object'    => 'page',
        'menu-item-object-id' => $pagina->ID,
        'menu-item-type'      => 'post_type',
        'menu-item-status'    => 'publish',
    ]);
}
wp_update_nav_menu_item($menuId, 0, [
    'menu-item-title'  => 'Sitio principal',
    'menu-item-url'    => '/',
    'menu-item-type'   => 'custom',
    'menu-item-status' => 'publish',
]);
paso('Menú principal: Inicio, Blog, Servicios y Sitio principal');

$ubicaciones = get_theme_mod('nav_menu_locations', []);
$ubicaciones['primary'] = $menuId;
set_theme_mod('nav_menu_locations', $ubicaciones);

// Categoría "Uncategorized" sin entradas: no debe quedar.
$sinCategoria = get_term_by('slug', 'uncategorized', 'category');
if ($sinCategoria && (int) $sinCategoria->count === 0) {
    // WordPress no deja borrar la categoría predeterminada: primero cambiamos cuál es.
    if (isset($categorias['Cuidado de uñas'])) {
        update_option('default_category', $categorias['Cuidado de uñas']);
    }
    wp_delete_term($sinCategoria->term_id, 'category');
    paso('Categoría "Uncategorized" eliminada');
}

/* ------------------------------------------------------------ 9. resumen */
wp_cache_flush();
$wp_rewrite->flush_rules(true);

file_put_contents(
    $WP . DIRECTORY_SEPARATOR . 'INSTALACION-LOCAL.txt',
    "WORDPRESS LOCAL - PROYECTO FINAL 2.0\r\n"
    . "=====================================\r\n\r\n"
    . "Blog:    https://localhost:8443/blog/\r\n"
    . "Panel:   https://localhost:8443/blog/wp-admin/\r\n"
    . "Usuario: {$USUARIO}\r\n"
    . "Clave:   ver el archivo CLAVE-ADMIN-LOCAL.txt (misma carpeta)\r\n\r\n"
    . "Base de datos: SQLite (03-Servidor-Local/datos/wordpress.sqlite)\r\n"
    . "No necesita MySQL. Para respaldar, copia ese archivo .sqlite.\r\n"
);

echo PHP_EOL;
echo '  ========================================================' . PHP_EOL;
echo '   WORDPRESS LISTO' . PHP_EOL;
echo '  ========================================================' . PHP_EOL;
echo '   Blog .... https://localhost:8443/blog/' . PHP_EOL;
echo '   Panel ... https://localhost:8443/blog/wp-admin/' . PHP_EOL;
echo '   Usuario . ' . $USUARIO . PHP_EOL;
echo '   Clave ... 02-WordPress/CLAVE-ADMIN-LOCAL.txt' . PHP_EOL;
echo '  ========================================================' . PHP_EOL;
