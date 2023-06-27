import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { rules, isSignedIn } from '../access';

export const Product = list({
    access: {
        create: isSignedIn,
        read: rules.canReadProducts,
        update: rules.canManageProducts,
        delete: rules.canManageProducts,
        },
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    photo: relationship({
      ref: 'ProductImage.product',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: {
          fields: ['image', 'altText'],
        },
        inlineEdit: {
          fields: ['image', 'altText'],
        },
      },
    }),
    status: select({
      options: [
        { label: 'Draft', value: 'DRAFT' },
        { label: 'Available', value: 'AVAILABLE' },
        { label: 'Unavailable', value: 'UNAVAILABLE' },
      ],
      ui: {
        displayMode: 'segmented-control',
      },
    }),
    price: integer(),
    user: relationship({
        ref: 'User.products',
        defaultValue: ({ context }) => ({
          connect: { id: context.session.itemId },
        }),
      }),
  },
});
