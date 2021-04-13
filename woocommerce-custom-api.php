define('CUSTOM_API_VERSION', 'custom-api/v1')

add_action('rest_api_init', 'register_custom_api_routes');
function register_custom_api_routes() {
    // Возвращает количество заказов разделенное по статусам
    register_rest_route(CUSTOM_API_VERSION, '/orders-count', [
        'methods'   => 'GET',
        'callback'  => 'orders_total_count'
    ]);

    // Возвращает массив заказов с использованным купоном. Купон указывается в параметрах запроса
    register_rest_route(CUSTOM_API_VERSION, '/coupon-orders/(?P<coupon_code>.+)', [
        'methods'               => 'GET',
        'callback'              => 'coupon_orders',
        'args'                  => [
            'coupon_code' => [
                'required'  => true,
                'sanitize_callback' => 'sanitize_coupon_code'
            ]
        ]
    ]);
}

function orders_total_count() {
    return wp_count_posts('shop_order');
}

function coupon_orders( WP_REST_Request $request ) {
    $code = urldecode($request->get_param('coupon_code'));

    $coupon = new WC_Coupon($code);
    $coupon_post = get_post($coupon->get_id());

    if ( ! $coupon_post) {
        return new WP_Error(
            'not_found',
            'Купон не найден',
            [
                'query'     => $request->get_params(),
                'status'    => 404
            ]
        );
    }

    global $wpdb;
    $return_array = [];

    $query = "SELECT
    p.ID AS order_id
    FROM
    {$wpdb->prefix}posts AS p
    INNER JOIN {$wpdb->prefix}woocommerce_order_items AS woi ON p.ID = woi.order_id
    WHERE
    p.post_type = 'shop_order' AND
    p.post_status IN ('" . implode("','", array_keys(wc_get_order_statuses())) . "') AND
    woi.order_item_type = 'coupon' AND
    woi.order_item_name = '" . $code . "'
    ORDER BY p.post_date DESC;";

    $orderIds = $wpdb->get_results($query);

    if ( !empty($orderIds) ) {
        foreach ($orderIds as $key => $order) {
            $order_id = $order->order_id;
            $return_array[] = wc_get_order($order_id)->get_data();
        }
    }

    return $return_array;
}

function sanitize_coupon_code($param) {
    return trim(htmlspecialchars((string) $param));
}