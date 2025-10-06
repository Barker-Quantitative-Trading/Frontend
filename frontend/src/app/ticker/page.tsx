"use client";

import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography } from "@mui/material";
import { Chart } from "@/widgets/Chart";
import useDynamicCandles from './dynamicCandles';

const Ticker = () => {
  const candles = useDynamicCandles();

  return (
    <div className="p-4 bg-[#0f111a] min-h-screen">
      <h1 className="text-white text-2xl mb-4">Ticker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[400px] bg-[#1f2130] rounded">
          <Chart width={1000} height={800} candles={candles}/>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
