<?php
/**
 * Revisión rápida del WordPress local.
 * Ejecutar con:  php 03-Servidor-Local\verificar.php
 *
 * - Corrige la dirección de la página de entradas si quedó duplicada (/blog/blog/).
 * - Muestra tema, plugins, entradas y enlaces, para comprobar que todo está bien.
 */

$RAIZ = dirname(__DIR__);
$WP   = $RAIZ . '/02-WordPress';

$_SERVER['HTTP_HOST']      = 'localhost:8443';
$_SERVER['SERVER_PORT']    = '8443';
$_SERVER['REQUEST_URI']    = '/blog/';
$_SERVER['SCRIPT_NAME']    = '/blog/index.php';
$_SERVER['PHP_SELF']       = '/blog/index.php';
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['HTTPS']          = 'on';

require_once $WP . '/wp-load.php';

/* --- Arreglo: la página de entradas no debe llamarse igual que la carpeta --- */
$paginaEntradas = (int) get_option('page_for_posts');
if ($paginaEntradas) {
    $pagina = get_post($paginaEntradas);
    if ($pagina && $pagina->post_name === 'blog') {
        wp_update_post(['ID' => $paginaEntradas, 'post_name' => 'entradas']);
        echo "  [ok] Página de entradas movida a /blog/entradas/" . PHP_EOL;
    }
}

global $wp_rewrite;
$wp_rewrite->set_permalink_structure('/%postname%/');
$wp_rewrite->flush_rules(true);

/* ------------------------------- Informe ------------------------------- */
echo PHP_EOL . '  WORDPRESS LOCAL' . PHP_EOL;
echo '  ' . str_repeat('-', 52) . PHP_EOL;
echo '  Dirección ....... ' . home_url('/') . PHP_EOL;
echo '  Panel ........... ' . admin_url() . PHP_EOL;
echo '  Tema ............ ' . wp_get_theme()->get('Name') . PHP_EOL;
echo '  Idioma .......... ' . get_locale() . PHP_EOL;
echo '  Enlaces ......... ' . get_option('permalink_structure') . PHP_EOL;
echo '  Visible en Google ' . (get_option('blog_public') ? 'SÍ (revisar)' : 'no (correcto en local)') . PHP_EOL;
echo '  Comentarios ..... ' . (get_option('default_comment_status') === 'open' ? 'abiertos' : 'cerrados') . PHP_EOL;

echo PHP_EOL . '  PLUGINS' . PHP_EOL;
foreach (get_plugins() as $archivo => $datos) {
    $activo = is_plugin_active($archivo) ? '[activo]  ' : '[guardado]';
    echo '  ' . $activo . ' ' . $datos['Name'] . PHP_EOL;
}

echo PHP_EOL . '  ENTRADAS' . PHP_EOL;
foreach (get_posts(['numberposts' => 10, 'post_status' => 'publish']) as $post) {
    echo '  - ' . $post->post_title . PHP_EOL . '    ' . get_permalink($post) . PHP_EOL;
}

echo PHP_EOL . '  PÁGINAS' . PHP_EOL;
foreach (get_pages(['post_status' => 'publish']) as $pagina) {
    $marca = ((int) get_option('page_on_front') === $pagina->ID) ? ' (portada)' : '';
    if ((int) get_option('page_for_posts') === $pagina->ID) {
        $marca = ' (lista de entradas)';
    }
    echo '  - ' . $pagina->post_title . $marca . PHP_EOL . '    ' . get_permalink($pagina) . PHP_EOL;
}

echo PHP_EOL . '  CATEGORÍAS' . PHP_EOL;
foreach (get_categories(['hide_empty' => false]) as $cat) {
    echo '  - ' . $cat->name . ' (' . $cat->count . ')' . PHP_EOL;
}

echo PHP_EOL;
