---
title: "Understanding ECMWF workflow in a theoretical view"
description: "In a simplified version, introduce the workflow of ECMWF, including four main parts and two crucial procedures (Ensemble of data assimilation and singular vector)."
publishDate: "20 September 2026"
tags: ["prediction", "Data Assimilation"]
draft: False
---
![workflow](/images/post/ecmwf_workflow/ECMWF_workflow.jpg)

## General introductions to these datasets

### ERA5 Reanalysis

**ERA5** provides an estimate of the **past atmospheric state** by combining historical observations with a numerical weather prediction model. It uses a **high-resolution model** together with deterministic **4D-Var data assimilation** to produce the analysis.

The background-error covariance matrix $\mathbf{B}$, which represents uncertainty in the model background state, is estimated using a **10-member Ensemble Data Assimilation (EDA)** system running at a lower resolution. This ensemble information helps 4D-Var determine how observational information should be incorporated into the analysis.

Once the data-assimilation process produces an **analysis state**, the high-resolution model is integrated forward from that state. The resulting model fields, together with the analyses, form the ERA5 reanalysis dataset and provide a **spatially and temporally consistent reconstruction of the historical atmosphere**.
  
### Medium-range Forecast

A **medium-range forecast** predicts the future atmospheric state up to about **15 days ahead**, using a relatively **high-resolution forecast model**.

Uncertainty in the initial atmospheric state is represented using **Ensemble Data Assimilation (EDA)**. A **50-member EDA**, typically run at a lower resolution, is used to estimate the background-error covariance matrix $\mathbf{B}$ and to provide perturbations for the ensemble initial conditions.

The forecasting system includes a **control forecast**, which starts from the unperturbed control analysis and does not apply perturbations to the observations or model physics. For the ensemble forecasts, the initial states are perturbed using two sources of uncertainty: **50-member EDA-based perturbations** and **50-member Singular Vector (SV)-based perturbations**.

The forecast model is then integrated forward from both the **control analysis state** and the **perturbed analysis states**. Together, these forecasts form an ensemble that captures uncertainty in the atmospheric evolution over the **0–15-day forecast range**.
  
### Long-range (Extended-range) Forecast

A **long-range, or extended-range, forecast** estimates the future atmospheric state up to about **46 days ahead**. Compared with medium-range forecasts, it typically uses a **lower-resolution model** to reduce the computational cost of running a large ensemble over a longer forecast period.

The **control forecast** starts from the unperturbed analysis state. To represent uncertainty in the initial conditions, ensemble members are generated using perturbations based on **Ensemble Data Assimilation (EDA)** and **Singular Vectors (SVs)**. The EDA information is inherited from the medium-range forecasting system, while additional SV perturbations are generated for the extended-range forecast.

In this setup, **50 EDA-based perturbations** are combined with **100-member SV-based perturbations** to construct the perturbed initial states. The forecast model is then integrated forward from both the **control analysis** and the **perturbed analysis states**, producing an ensemble that samples a range of possible atmospheric evolutions over the following **0–46 days**.

### Reforecast

A **reforecast** is a forecast produced from a **past initial state**, using the same model configuration as the corresponding operational forecast system. Because many historical forecasts are generated in a consistent way, reforecast datasets are particularly useful for **evaluating model performance, studying atmospheric predictability, and developing statistical post-processing or calibration methods for real-time forecasts**.

The **control reforecast** can be initialized from a historical reanalysis, such as **ERA5**. Ensemble members are then created by perturbing this control initial state. These perturbations may combine two sources: **Ensemble Data Assimilation (EDA)** perturbations, taken from the 10-member ERA5 EDA for the corresponding date, and **Singular Vector (SV)** perturbations generated using the SV procedure for that same date.

The model is then integrated forward from both the **unperturbed control state** and the **perturbed initial states**, producing a historical ensemble forecast. In this way, the reforecast closely reproduces the setup of the corresponding real-time ensemble forecasting system while being applied retrospectively to past weather situations.

## Ensemble of Data Assimilation (EDA)

### Key component: Incremental 4DVar

The incremental method include two loops. In the outer loop, a high-resolution model is used for the computation of the model trajectory and calculating the departures between observations and model. In the inner loop, low-resolution models (tangent linear model and adjoint model) are used for optimizing the 4DVar cost function.

- Input background state $\bm{x}_fg=\bm{x}_b$, high-resolution model $\mathcal{M}$, low-resolution tangent linear model $\bm{TLM}$, low-resolution adjoint model $\bm{ADM}$ and observations $\bm{y}$.
- Calculate a trajectory $\bm{x}$ and the departures from observations $\bm{d}=\bm{y}-\mathcal{H}(\bm{x})$.
- Run the inner loop with departures $\bm{d}$ (perhaps considering preconditioner to accelerate the speed of convergence). Finally, it outputs the optimized increment $\delta\bm{x}$.
- Update the background state in $\bm{x}_{fg}=\bm{x}_{fg}+\bm{S}(\delta\bm{x})$. Then back to the first step.
- If it reaches the last outer loop, then use late 4D-start to generate an-type fields. Firstly, update $\delta\bm{x}$ to the forecst time by TLM. Then, the initial state is $\bm{x}_{fg}+\bm{S}(\delta\bm{x}_t)$ at the time of forecast.

![workflow](/images/post/ecmwf_workflow/incremental_4DVar.jpg)

In the method, we assume $J(\bm{x})=J(\bm{x}_b+\delta\bm{x}) \approx J(\bm{x}_b)+J(\delta\bm{x})$. Therefore, minimizing the latter cost function looks like a Gaussian-Newton method to minimize $J(\bm{x})$. To reduce the linear error, it chooses to minimize many times. Yet, we should know that **the outer loop doesn't guarantee convergence** to the minimum of $J(\bm{x})$.

### Procedure



## Singular vectors (SVs)

It represents large scale information. 

Mathmatically, the growth rate of an initial perturbation $\delta \bm{x}$ can be represented as:
$$
\begin{equation}
\sigma = \dfrac{\delta \bm{x}_t^T N \delta \bm{x}_t}{\delta \bm{x}^T  M \delta \bm{x}},
\end{equation}
$$
where $\delta \bm{x}_t$ is the perturbation at time $t$, $N$ is the final norm that normalizes the requested direction of perturbation and $M$ is the initial norm. Maximizing $\sigma$ is equivalent to solving a generalized eginvalue problem.

Practically, assume we have a TLM operator $\bm{L}$, its ADM operator $\bm{L}^T$ and a projection operator $\bm{P}$, we have:

$$
\begin{equation}
\bm{L}^T \bm{P}^T \bm{N} \bm{P} \bm{L} \delta\bm{x} = \sigma\bm{M}\delta\bm{x}.
\end{equation}
$$

In order to transfer it into a normal eigenvalue problem while keeping it hermitian, we use the square-root of $\bm{M}$ to normalize it. The equation transfers into:

$$
\begin{equation}
\bm{M}^{-1/2} \bm{L}^T \bm{P}^T \bm{N} \bm{P} \bm{L} \bm{M}^{-1/2} \bm{u} = \sigma \bm{u}, \text{where } \bm{u}=\bm{M}^{1/2} \delta\bm{x}.
\end{equation}
$$

We can use Lanczos method to solve the problem. The left part can be represented as the following procedure:

- Calculate $\bm{u}=\bm{M}^{1/2} \delta\bm{x}$.
- Apply $\bm{M}^{-1/2}$ to get $\bm{v}=\bm{M}^{-1/2} \bm{u}$.
- Integrate TLM to calculate $\bm{L} \bm{v}$.
- Use the projection operator $\bm{P}$ to project the perturbation to selected regions.
- Apply normalization. Use $\bm{N}$ to normalize the projected perturbation.
- Apply $\bm{P}^T$.
- Integrate the ADM from the normalized perturbation.
- Apply $\bm{M}^{-1/2}$.

After the Lanczos iteration, we have singular values and singular vectors of $\bm{u}$. To obtain signluar vectors related to $\delta \bm{x}$ (*physical space*), we need use $\bm{M}^{-1/2}$ to multiply singular vectors.

## Appendix

### Limited-memory BFGS

### The Lanczos algorithm

Algorithms based on Lanczos theory are very useful to solve **an eigenvalue problem when only a few of the extreme eigenvectors are needed**. It can be applied to large and sparse problems. The algorithm does not access directly the matrix elements of the operator that defines the problem, but it gives an estimate of the eigenvectors through successive application of the operator. 

The heart of the algorithm is to **construct a tridiagonal matrix** by projecting the originial propagator into a Krylov subpace. By applying SVD to the tridiagonal matrix, we have several extreme eigenvectors of the original propagator.

:::note[Pseudocode to perform the Lanczos algorithm] 
Consider the eigenvalue problem $A_{p} x=\sigma^2 x$

***First, construct a tridiagonal matrix***

Choose a random normalized vector $q_1$

Set $\beta_0 = 0$

for $i = 1, \dots, n$ do

- $w \leftarrow A_p q_i$
- if $i > 1$ then
  - $w \leftarrow w - \beta_{i-1} q_{i-1}$
- end if
- $\alpha_i \leftarrow q_i^{\top} w$
- $w \leftarrow w - \alpha_i q_i$
- Re-orthogonalize $w$ against $\{q_1,\dots,q_i\}$
- $\beta_i \leftarrow \lVert w \rVert$
- if $\beta_i < \mathrm{tol}$ then
  - break
- end if
- $q_{i+1} \leftarrow w / \beta_i$

end for

$Q \leftarrow [q₁, q₂, ..., qₖ]$

$T \leftarrow$  $\operatorname{tridiag}(\beta_1,\dots,\beta_{k-1};\,\alpha_1,\dots,\alpha_k;\,\beta_1,\dots,\beta_{k-1})$

return $Q$, $T$

***Second, apply SVD to the tridiagonal matrix***

$U^T, \Sigma, V \leftarrow SVD(T)$

$V_{A_p} \leftarrow QV$

:::