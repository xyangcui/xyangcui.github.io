---
title: "Key definitions in ensemble forecast"
description: "some definitions of ensemble forecast"
publishDate: "7 July 2026"
tags: ["ensemble forecast", "predictability"]
draft: False
---

## What is ensemble forecast?

An ensemble forecast is a set of forecasts run from slightly different initial conditions to account for uncertainty in the atmosphere’s starting state, different physical parameters to account for uncertainty in the model itself, or different boundary conditions (e.g., sea ice, soil moisture, land ice and so on). By running the model multiple times with small variations, we can better understand the range of possible ways the atmosphere may evolve.

![Schematic of ensemble forecast](/images/post/intro_to_ens_forecast/ensemble_forecasting_schematicpng.webp)

The ensemble forecast provides a range of possible future scenarios that are consistent with our knowledge of the initial state of the atmosphere and the capabilities of our forecast models. By analyzing the spread among ensemble members, together with our understanding of atmospheric dynamics and physical processes, we can estimate forecast uncertainty and assess how much confidence we should place in the prediction.

When the ensemble members remain close together, indicating a small spread and lower uncertainty, we can have greater confidence in the forecast. However, when the ensemble members diverge and the spread becomes large, it suggests that the atmosphere may evolve in multiple possible ways, and the forecast becomes less certain.

## What can we get from an ensemeble forecast?

### Ensemble mean/spread

Both ensemble mean and spread are simple "**best guess**" forecast, so one can't use them to forecast what extremes could happen.
**The ensemble mean is the average over all ensemble members**. It often represents the information of large-scale flow-pattern since it smoothes the flow. **The ensemble spread, or uncertainty, is the standard deviation over all ensemble members**. The more uncertainty/spread there is, the less confident should we trust the ensemble mean. Therefore, **the ensemble mean should always be used together with the spread**. For a **skewed (non-gaussian)** distribution, e.g. precipitation, however, **the median** may be a much better alternative thanks in part to the fact that **only guassian distribution can be fully described with mean and standard deviation**.

### Alternative scenarios-clusters

### Meteogram (time series)


### Probabilities of event

An estimation of how much probility of an event would occur.

### Extreme Forecast Index (EFI)

It is a product specifically designed to detect extremes, related to the model climate.
It compares the current ensemble forecast to **the model climate distribution**. Therefore, it ranges from -1 to 1. The closer to both sides, the more likely the weather is to be at the extreme. **The EFI is a "impact-based" forecast**, since the definition of extreme is, totaly different in distinct regions.
