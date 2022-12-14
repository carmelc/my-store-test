/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx, Grid, Button, Input, Text, IconButton } from 'theme-ui'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { Plus, Minus } from '@components/icons'
import {
  useUpdateItemQuantity,
  useRemoveItemFromCart,
} from '@lib/wix/storefront-data-hooks'
import { media } from '@wix/sdk';
import type { LineItem } from "@lib/wix-stores.model";

const CartItem = ({
  item,
}: {
  item: LineItem
}) => {
  const updateItem = useUpdateItemQuantity()
  const removeItem = useRemoveItemFromCart()
  const [quantity, setQuantity] = useState(item.quantity)
  const [removing, setRemoving] = useState(false)
  const updateQuantity = async (quantity: number) => {
    await updateItem(item._id!, quantity)
  }
  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value)

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
    }
  }
  const handleBlur = () => {
    const val = Number(quantity)

    if (val !== item.quantity) {
      updateQuantity(val)
    }
  }
  const increaseQuantity = (n = 1) => {
    const val = Number(quantity) + n

    if (Number.isInteger(val) && val >= 0) {
      setQuantity(val)
      updateQuantity(val)
    }
  }
  const handleRemove = async () => {
    setRemoving(true)

    try {
      // If this action succeeds then there's no need to do `setRemoving(true)`
      // because the component will be removed from the view
      await removeItem(item._id!)
    } catch (error) {
      console.error(error)
      setRemoving(false)
    }
  }

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
  }, [item.quantity])

  return (
    <Grid gap={2} sx={{ width: '100%', m: 12 }} columns={[2]}>
      <div
        sx={{
          padding: 1,
          border: '1px solid gray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {item.image ? <Image
          height={130}
          width={130}
          unoptimized
          alt={item.productName?.original}
          src={media.getScaleToFitImageURL(item.image!, 130, 130, {})}
        /> : null}
      </div>
      <div>

          <>
            {item.productName?.original}
            <Text
              sx={{
                fontSize: 4,
                fontWeight: 700,
                display: 'block',
                marginLeft: 'auto',
              }}
            >
              {item.price?.formattedAmount ?? '0.00'}
            </Text>
          </>
        <Themed.ul sx={{ mt: 2, mb: 0, padding: 0, listStyle: 'none' }}>
          <li>
            <div sx={{ display: 'flex', justifyItems: 'center' }}>
              <IconButton onClick={() => increaseQuantity(-1)}>
                <Minus width={18} height={18} />
              </IconButton>

              <label>
                <Input
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                  }}
                  type="number"
                  max={99}
                  min={0}
                  value={quantity}
                  onChange={handleQuantity}
                  onBlur={handleBlur}
                />
              </label>
              <IconButton onClick={() => increaseQuantity(1)}>
                <Plus width={18} height={18} />
              </IconButton>
            </div>
          </li>
          {Object.keys(item.catalogReference?.options?.options ?? {}).map((optionKey: any) => (
            <li key={optionKey}>
              {optionKey}:{item.catalogReference?.options!.options![optionKey]}
            </li>
          ))}
        </Themed.ul>
      </div>
    </Grid>
  )
}

/**
 *

 */

export default CartItem
