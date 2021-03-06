// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';

import defaultImage from './Image.mock';
import Image, { ImageVanilla } from '.';

storiesOf('Atoms', module).addWithChapters('Image', {
  chapters: [
    {
      sections: [
        {
          sectionFn: () => <ImageVanilla {...defaultImage} className="hide-default-sample" />,
          options: {
            showSource: true,
            allowSourceToggling: true,
            showPropTables: true,
            allowPropTablesToggling: true,
          },
        },
      ],
    },
    {
      title: 'Responsive Image Variations',
      sections: [
        {
          title: 'Default',
          sectionFn: () => <Image {...defaultImage} />,
        },
      ],
    },
  ],
});
