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

### EDA procedure



## Singular vector (SV)

The Singular Vector (SV) method is a **linear approach for identifying the directions along which perturbations are most likely to grow from a given model state**. Based on the linearized model dynamics over a specified time interval, SVs describe the perturbation structures that can experience the strongest amplification during their subsequent evolution. In practice, the leading SVs are usually retained to represent the dominant directions of potential perturbation growth around the current state.

SVs primarily capture **large-scale, dynamically organized perturbation structures** and provide information about the most rapidly growing directions of the model dynamics. However, perturbation growth can also be influenced by uncertainties at smaller spatial scales that may not be sufficiently represented by the leading SVs alone. Ensemble Data Assimilation (EDA), in contrast, provides flow-dependent perturbation information associated with **medium- and small-scale uncertainties**.

By combining the large-scale dynamically growing structures identified by SVs with the medium- and small-scale perturbation information provided by EDA, a broader range of relevant uncertainty can be represented. The combined perturbation space therefore provides a **more comprehensive description of the possible directions of future model-state evolution**, improving the representation of dynamically relevant forecast uncertainty.

### SV procedure

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

Finally, SV-type perturbations are obtained by randomly combining these singular vectors.

## Appendix

### Limited-memory BFGS

The L-BFGS algorithm is an iterative method for solving nonlinear optimization problems. As a quasi-Newton method, it uses gradient information from previous iterations to approximate the curvature of the cost function. Unlike the standard Newton method, L-BFGS **avoids explicitly computing, storing, and inverting the large Hessian matrix**, making it more suitable for high-dimensional optimization problems.

The key idea of L-BFGS is to retain a limited number of vector pairs, $s_k=x_{k+1}-x_k$ and $y_k=g_{k+1}-g_k$, which describe the changes in the state and its gradient between successive iterations. These historical pairs contain information about the local curvature of the cost function. Using a **two-loop recursion**, L-BFGS efficiently combines this information to implicitly approximate the action of the inverse Hessian on the gradient and obtain a search direction,

$$
d_k \approx -H_k \nabla J(x_k),
$$

where $H_k$ denotes the approximation of the inverse Hessian. The state is then updated along this direction with a step length determined by a line-search procedure. Since only a limited number of recent $(s_k,y_k)$ pairs are retained, the method significantly reduces memory and computational requirements while preserving useful curvature information from previous iterations.

:::note[Pseudocode to perform the L-BFGS algorithm]
Initialize $x_\theta=xb$, $s=\Phi$, $y=\Phi$

for k = 0, ..., Kmax *do*

&emsp;$g_k=\nabla J(x_k)$

&emsp;if ||$g_k$|| < $\epsilon$ *then*

&emsp;&emsp;stop

&emsp;&emsp;end if

&emsp;$d_k$ = L-BFGS-Two-Loop($g_k$, s, y)

&emsp;if ${g_k}^T d_k$ ≥ 0 *then*

&emsp;&emsp;s, y = $\Phi$

&emsp;&emsp;$d_k$ = -$g_k$

&emsp;end if

&emsp;Find $\alpha_k$ satisfying Armijo condition

&emsp;&emsp;$x_{k+1}=x_k+\alpha_k * d_k$

&emsp;&emsp;$g_{k+1}=\nabla J(x_{k+1})$

&emsp;$s_k=x_{k+1}-x_k$

&emsp;$y_k=g_{k+1}-g_k$

&emsp;if ${s_k}^Ty_k$ > threshold *then*

&emsp;&emsp;(S, Y).append($s_k$, $y_k$)

&emsp;&emsp;retain only the latest m pairs

&emsp;end if

return $x_k$

:::

:::note[Pseudocode of the L-BFGS-TWO-LOOP function]
&emsp;# Goal:

&emsp;# approximately compute

&emsp;#       d = -$H_k$ g

&emsp;# without explicitly constructing $H_k$

&emsp;$q \leftarrow -g$

&emsp;alpha_list $\leftarrow$ empty list

&emsp;--------------------------------------------------

&emsp;First loop: newest $\rightarrow$ oldest

&emsp;--------------------------------------------------

&emsp;for i = newest curvature pair $\rightarrow$ oldest curvature pair *do*

&emsp;&emsp;$s \leftarrow S_i$

&emsp;&emsp;$y \leftarrow Y_i$

&emsp;&emsp;if $y^Ts$ is too small or non-positive  *then*

&emsp;&emsp;&emsp;CONTINUE

&emsp;&emsp;end if

&emsp;&emsp;$\rho \leftarrow \dfrac{1}{y^Ts}$

&emsp;&emsp;$\alpha \leftarrow \rho s^Tq$

&emsp;&emsp;$q \leftarrow q-\alpha y$

&emsp;&emsp;store $\alpha$

&emsp;--------------------------------------------------

&emsp;Initial inverse-Hessian scaling

&emsp;--------------------------------------------------

&emsp;if no previous curvature pairs *then*

&emsp;&emsp;$\gamma \leftarrow 1$

&emsp;else

&emsp;&emsp;use newest pair (s, y)

&emsp;&emsp;$\gamma \leftarrow \dfrac{s^Ty}{y^Ty}$

&emsp;end if

&emsp;$r \leftarrow \gamma q$

&emsp;--------------------------------------------------

&emsp;Second loop: oldest → newest

&emsp;--------------------------------------------------

&emsp;for each valid curvature pair (s, y) *do*

&emsp;&emsp;from oldest → newest

&emsp;&emsp;$\rho \leftarrow \dfrac{1}{y^Ts}$

&emsp;&emsp;$\beta \leftarrow \rho y^Tr$

&emsp;&emsp;recover corresponding $\alpha$

&emsp;&emsp;$r \leftarrow r + s (\alpha-\beta)$

&emsp;return r
:::

### The Lanczos algorithm

The Lanczos algorithm is an efficient iterative method for solving **large-scale eigenvalue problems when only a few extreme eigenvalues and their corresponding eigenvectors are required**. It is particularly suitable for large and sparse systems, since it does not require explicit access to or storage of all matrix elements. Instead, the algorithm extracts the dominant spectral information through successive matrix-vector products.

The heart of the Lanczos algorithm is to **construct a much smaller tridiagonal matrix** by projecting the original operator onto a Krylov subspace. This subspace is generated iteratively by repeatedly applying the original operator to a vector. The resulting tridiagonal matrix preserves the essential spectral information of the original high-dimensional problem while being much cheaper to store and solve.

By performing an eigendecomposition of the tridiagonal matrix, several extreme eigenvalues and their corresponding eigenvectors can be efficiently approximated. The eigenvectors of the original operator are then reconstructed from the eigenvectors of the reduced problem and the Lanczos basis vectors. In this way, the Lanczos algorithm transforms a large-scale eigenvalue problem into a much smaller one without explicitly forming or decomposing the full operator.

:::note[Pseudocode to perform the Lanczos algorithm]
Consider the eigenvalue problem $A_{p} x=\sigma^2 x$

***First, construct a tridiagonal matrix***

Choose a random normalized vector $q_1$

Set $\beta_0 = 0$

for $i = 1, \dots, n$ *do*

&emsp;$w \leftarrow A_p q_i$

&emsp;if $i > 1$ *then*

&emsp;&emsp;$w \leftarrow w - \beta_{i-1} q_{i-1}$

&emsp;end if

&emsp;$\alpha_i \leftarrow q_i^{\top} w$

&emsp;$w \leftarrow w - \alpha_i q_i$

&emsp;Re-orthogonalize $w$ against $\{q_1,\dots,q_i\}$

&emsp;$\beta_i \leftarrow \lVert w \rVert$


&emsp;if $\beta_i < \mathrm{tol}$ *then*

&emsp;&emsp;break

&emsp;end if

&emsp;$q_{i+1} \leftarrow w / \beta_i$

end for

$Q \leftarrow [q₁, q₂, ..., qₖ]$

$T \leftarrow$  $\operatorname{tridiag}(\beta_1,\dots,\beta_{k-1};\,\alpha_1,\dots,\alpha_k;\,\beta_1,\dots,\beta_{k-1})$

return $Q$, $T$

***Second, apply SVD to the tridiagonal matrix***

$U^T, \Sigma, V \leftarrow SVD(T)$

$V_{A_p} \leftarrow QV$

:::