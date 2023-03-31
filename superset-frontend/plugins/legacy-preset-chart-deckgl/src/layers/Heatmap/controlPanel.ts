/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {
  ControlPanelConfig,
  // getStandardizedControls,
  sections,
  formatSelectOptions,
} from '@superset-ui/chart-controls';
import {
  t,
  validateNonEmpty,
  legacyValidateNumber,
  legacyValidateInteger,
} from '@superset-ui/core';
import {
  autozoom,
  extruded,
  filterNulls,
  gridSize,
  jsColumns,
  jsDataMutator,
  jsOnclickHref,
  jsTooltip,
  mapboxStyle,
  spatial,
  viewport,
} from '../../utilities/Shared_DeckGL';

const INTENSITY_OPTIONS = Array.from(
  { length: 10 },
  (_, index) => index / 10 + 0.1,
);
const RADIUS_PIXEL_OPTIONS = Array.from(
  { length: 15 },
  (_, index) => index * 5,
);

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [spatial],
        ['size'],
        ['row_limit'],
        [filterNulls],
        ['adhoc_filters'],
        [
          {
            // TODO: add translations
            name: 'intensity',
            config: {
              type: 'SelectControl',
              label: 'Intesity',
              description:
                'Intensity is the value multiplied by the weight to obtain the final weight',
              freeForm: true,
              validators: [legacyValidateNumber],
              default: 1,
              choices: formatSelectOptions(INTENSITY_OPTIONS),
            },
          },
        ],
        [
          {
            // TODO: add translations
            name: 'radius_pixels',
            config: {
              type: 'SelectControl',
              label: 'Intensity Radius',
              description:
                'Intensity Radius is the radius at which the weight is distributed',
              freeForm: true,
              validators: [legacyValidateInteger],
              default: 30,
              choices: formatSelectOptions(RADIUS_PIXEL_OPTIONS),
            },
          },
        ],
      ],
    },
    {
      label: t('Map'),
      controlSetRows: [
        [mapboxStyle, viewport],
        ['color_scheme'],
        [autozoom],
        [gridSize],
        [extruded],
        [
          {
            name: 'js_agg_function',
            config: {
              type: 'SelectControl',
              label: t('Dynamic Aggregation Function'),
              description: t(
                'The function to use when aggregating points into groups',
              ),
              default: 'sum',
              clearable: false,
              renderTrigger: true,
              choices: [
                ['sum', t('sum')],
                ['min', t('min')],
                ['max', t('max')],
                ['mean', t('mean')],
                ['median', t('median')],
                ['count', t('count')],
                ['variance', t('variance')],
                ['deviation', t('deviation')],
                ['p1', t('p1')],
                ['p5', t('p5')],
                ['p95', t('p95')],
                ['p99', t('p99')],
              ],
            },
          },
        ],
      ],
    },
    {
      label: t('Advanced'),
      controlSetRows: [
        [jsColumns],
        [jsDataMutator],
        [jsTooltip],
        [jsOnclickHref],
      ],
    },
  ],
  controlOverrides: {
    size: {
      label: t('Weight'),
      description: t("Metric used as a weight for the grid's coloring"),
      validators: [validateNonEmpty],
    },
  },
  formDataOverrides: formData => ({
    ...formData,
  }),
};

export default config;
