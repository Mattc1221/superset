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
import { HeatmapLayer } from 'deck.gl';
import React from 'react';
import { t /* , CategoricalColorNamespace */ } from '@superset-ui/core';
import { commonLayerProps /* , getAggFunc */ } from '../common';
import { createDeckGLComponent } from '../../factory';
import TooltipRow from '../../TooltipRow';

function setTooltipContent(o) {
  return (
    <div className="deckgl-tooltip">
      <TooltipRow
        label={t('Centroid (Longitude and Latitude): ')}
        value={`(${o.coordinate[0]}, ${o.coordinate[1]})`}
      />
    </div>
  );
}

export function getLayer(formData, payload, onAddFilter, setTooltip) {
  const fd = formData;
  const data = payload.data.features;

  // TODO: add fd.js_data_mutator -- not sure if applicable
  // TODO: add aggFunc -- not sure if applicable
  // TODO: add control panel options for radius and intensity

  const { intensity = 1, radius_pixels: radiusPixels = 30 } = formData;

  return new HeatmapLayer({
    id: `heatmp-layer-${fd.slice_id}`,
    data,
    pickable: false,
    intensity,
    radiusPixels,
    getPosition: d => d.position,
    getWeight: d => d.weight,
    ...commonLayerProps(fd, setTooltip, setTooltipContent),
  });
}

function getPoints(data) {
  return data.map(d => d.position);
}

export default createDeckGLComponent(getLayer, getPoints);
