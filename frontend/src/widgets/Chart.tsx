"use client";

import React from 'react';

export default function Chart({ symbol }: { symbol?: string }) {
	return (
		<div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded">
			<div className="text-sm text-gray-500">[Chart placeholder for {symbol}]</div>
		</div>
	);
}
