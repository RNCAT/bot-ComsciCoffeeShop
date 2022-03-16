/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
module.exports.cart_data = async function () {
  const funcGetCart = arguments[0]
  const userId = arguments[1]

  const cart = await funcGetCart(userId)

  const details = []
  let total = 0

  if (cart && (cart.coffees.length > 0 || cart.bakeries.length > 0)) {
    // Add Coffee
    if (cart.coffees.length > 0) {
      details.push({
        type: 'text',
        text: 'Coffee',
        weight: 'bold',
        style: 'italic',
      })

      cart.coffees.forEach((coff) => {
        total += coff.price * coff.qty
        const type = coff.type === 0 ? 'Hot' : 'Ice'
        const sweet =
          coff.sweet === 0
            ? '150% Sweet'
            : coff.sweet === 1
            ? '100% Sweet'
            : coff.sweet === 2
            ? '50% Sweet'
            : 'No Sugar'

        details.push(
          {
            type: 'box',
            layout: 'baseline',
            contents: [
              {
                type: 'icon',
                url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
              },
              {
                type: 'text',
                text: `${coff.name}`,
                flex: 0,
                margin: 'sm',
                size: 'sm',
                weight: 'regular',
              },
              {
                type: 'text',
                text: `(${coff.price} ฿ x ${coff.qty}) = ${Number(
                  coff.price * coff.qty
                ).toLocaleString()} ฿`,
                size: 'sm',
                align: 'end',
                color: '#aaaaaa',
              },
            ],
          },
          {
            type: 'box',
            layout: 'horizontal',
            contents: [
              {
                type: 'text',
                text: `${type}, ${sweet}`,
                size: 'xxs',
                color: '#988686',
                flex: 0,
                wrap: true,
                margin: 'none',
                offsetTop: 'none',
              },
            ],
          }
        )
      })

      details.push({
        type: 'separator',
        margin: 'md',
      })
    }

    // Add Bakeries
    if (cart.bakeries.length > 0) {
      details.push({
        type: 'text',
        text: 'Bakery',
        color: '#333333',
        style: 'italic',
        weight: 'bold',
      })

      cart.bakeries.forEach((bakery) => {
        total += bakery.price * bakery.qty

        details.push({
          type: 'box',
          layout: 'baseline',
          contents: [
            {
              type: 'icon',
              url: 'https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png',
            },
            {
              type: 'text',
              text: `${bakery.name}`,
              flex: 0,
              margin: 'sm',
              size: 'sm',
              weight: 'regular',
            },
            {
              type: 'text',
              text: `(${bakery.price} ฿ x ${bakery.qty}) = ${Number(
                bakery.price * bakery.qty
              ).toLocaleString()} ฿`,
              size: 'sm',
              align: 'end',
              color: '#aaaaaa',
            },
          ],
        })
      })

      details.push({
        type: 'separator',
        margin: 'md',
      })
    }

    // Add Total
    details.push(
      {
        type: 'separator',
        margin: 'md',
        color: '#5C4E4E',
      },
      {
        type: 'box',
        layout: 'horizontal',
        contents: [
          {
            type: 'text',
            text: 'TOTAL',
            size: 'sm',
            color: '#5C4E4E',
            weight: 'bold',
          },
          {
            type: 'text',
            text: `${Number(total).toLocaleString()} ฿`,
            size: 'sm',
            color: '#5C4E4E',
            align: 'end',
            weight: 'bold',
          },
        ],
      }
    )

    const msg = [
      {
        type: 'flex',
        altText: 'CART',
        contents: {
          type: 'bubble',
          hero: {
            type: 'image',
            url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbarelyadventist.com%2Fwp-content%2Fuploads%2F2014%2F09%2Fimage10.jpg&f=1&nofb=1',
            size: 'full',
            aspectRatio: '20:13',
            aspectMode: 'cover',
            action: {
              type: 'uri',
              uri: 'https://linecorp.com',
            },
          },
          body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'md',
            action: {
              type: 'uri',
              uri: 'https://linecorp.com',
            },
            contents: [
              {
                type: 'text',
                text: "Alpaca's Coffee Shop",
                size: 'xl',
                weight: 'bold',
                align: 'center',
                decoration: 'underline',
                color: '#905c44',
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'md',
                spacing: 'sm',
                contents: details,
              },
              {
                type: 'separator',
                margin: 'md',
                color: '#5C4E4E',
              },
            ],
          },
          footer: {
            type: 'box',
            layout: 'vertical',
            contents: [
              {
                type: 'button',
                style: 'primary',
                color: '#905c44',
                margin: 'md',
                height: 'sm',
                action: {
                  type: 'uri',
                  label: 'Show Details',
                  uri: `https://liff.line.me/${process.env.LIFF_ID_SHOPPING_CART}`,
                },
              },
            ],
          },
        },
      },
    ]

    return msg
  }
  const msg = {
    type: 'text',
    text: `คุณยังไม่มีรายการสินค้าในตระกร้า`,
  }

  return msg
}
