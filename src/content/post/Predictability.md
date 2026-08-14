---
title: "Mathematical and Informatics views of predictability"
description: "Two views of preditability are introduced in the article. One comes from math and the other comes from information theory."
publishDate: "6 August 2026"
tags: ["predictability","prediction"]
draft: False
---

## Some accepted aspects of predictability

- Prediction of future climate states can **never be perfect at any lead time** due to turbulent nature of the atmospheric motion and intrinsic nonlinearity.
- Predictability is **a measure of the uncertainty** that limits the accuracy of prediction.
- Useful prediction must include information about the predictability (uncertainty).
- Predictability is a function of state variables (temperature, winds, precipitation etc.) and varies with space, especially with the forecast lead time.
- For a given variable and at a given place, **the predictability (uncertainty) decreases (grows) with lead times**.  
- **Predictability can be estimated, albeit imperfectly**,  by using observations limited by length of records or prediction tools (dynamical models, statistical models) along with observations. 
- Predictability that is estimated using a model system (the perfect model approach) is **model-dependent; hence may be called practical predictability**.
- **Predictability may be viewed as a limit of the practical predictability** when the model system approaches ‘ultimate’ perfectness.
- **The optimal model system used for estimation of predictability should be able to predict future climate states as a whole**, because any single variable at a given location is intimately linked to other fields at neighboring locations. **Thus, CGCM is an ideal tool for this purpose**.
:::note
Aspects come from a meeting "**NRC: Assessment of the ISI predictabiliy**" in 2011.
:::

## View1: Nonlinear growth of forecast error



### Three kinds of predictability problem

The first kind is a Cauchy problem that how initial error grows with lead time. The second is how model error grows with lead time and the third is a how boundary error grows with lead time.

### Conditional Nonlinear Optimal Perturbation

#### develop from linear dynamics

Determination of the fastest growing initial perturbations in numerical weather and climate prediction and in the atmospheric research is of central importance. The linear approach was firstly considered both theoretically and practically. **It assumes the initial perturbation is sufficiently small that its evolution can be governed by the tangent linear model (TLM) of an nonliear system.** Based on this assumption, Linear singular vectors (LSV) and linear singular values (LSVA) were introduced by Lorenz (1965) to investigate the predictability of the atmospheric motion. Such thinking was also shown in practical use, for example, the Singular Vectors (SVs), a well-known method to perturb initial values to generate a forecast ensemble, which has been used by the Europe Centre of Median-Range Forecast (ECMWF) to produce the best forecast in the world.

#### Natural extension of linear dynamics

However, a formidable problem is that the motions of the atmosphere and ocean are governed by complicated nonliear systems. Such nonlinearity raises at least two problems of the TLM. **How long it is valid and how long the interval is.** Therefore, **it is desirable and necessary to deal with the nonliear models themselves rather than their linear approximation**. To resolve this, Mu (2000) formulated a novel concept of nonliear singular values (NSVA) and nonliear singular vectors (NSV).

Assume that the model governing the motions of the atmosphere or ocean is as follows:
$$
\begin{equation}
\begin{cases}
\dfrac{\partial \bm{w}}{\partial t} + \bm{F}(\bm{w}) = 0, & \text{in } \Omega \times [0,T], \\[6pt]
\bm{w}\big|_{t=0} = \bm{w_0},
\end{cases}
\end{equation}
$$
where $\bm{F}$ is a nonliear operator. Let $\bm{U}(x,t)$ and $\bm{U}(x,t)+\bm{u}(x,t)$ be the solutions of (1) with initial value $\bm{U}_0$ and $\bm{U}_0+\bm{u}_0$, respectively, where $\bm{u}_0$ is the initial perturbation.

Here, $\bm{u}_T$ denotes the evolution of the initial perturbation. $\bm{u}_0^*$ is the fastest growing perturbation. The former perturbation must obey the following rules:
$$ 
\begin{equation}
J(\bm{u}_0^*)= \max_{\bm{u}_0}J(\bm{u}_0)
\end{equation}
$$
$$
\begin{equation}
J(\bm{u}_0) = \lVert \bm{u}_T \rVert / \lVert \bm{u}_0 \rVert,  \text{    while } \lVert \bm{u}_T \rVert \le c\lVert \bm{u}_0 \rVert
\end{equation}
$$
where $c$ is a constant independent of $\bm{u}_0$. Typically, it is a problem of optimization. To solve this, we need use (constrained or unconstrianed) optimizing methods , including sequential quadratic programming (SPQ), Trust Region, Genetic Algorithm (GA), Particle Swarm Optimization (PSA), Differential Evolution (DE) and so on.

##### Why the nonliear vectors are constrained?

The "constrained" means changing the requirment, the method requires $\lVert \bm{u}_0^* \rVert \le \delta$. Such conditional nonlinear optimal perturbation (CNOP) is considered because it is **difficult to check this requirement** for complicated governing equations of atmosphere and ocean (Mu et al. 2003). And further research (Mu et al. 2003) suggested that such condition is reasonable and may get **faster, more realistic perturbation** than unconstrained methods in searching for the fastest perturbation. For example, unconstrained perturbation may reach $5\,^\circ\mathrm{C}$ or higher temperature anomalies of ENSO, which is unrealistic, but grows slower than the conditional optimal perturbation.

### Nonlinear Local Lyapunov Exponent


## View2: Evolution of signal and noise

## Reference

Lorenz, E. N., 1965: A study of the predictability of a 28-variable atmospheric model. *Tellus*, 17(3), 321–333. <https://doi.org/10.3402/tellusa.v17i3.9076>.

Mu, M., 2000: Nonlinear singular vectors and nonlinear singular values. *Sci. China Ser. D-Earth Sci*. 43, 375–385. <https://doi.org/10.1007/BF02959448>.

Mu, M., Duan, W. S., and Wang, B., 2003: Conditional nonlinear optimal perturbation and its applications, *Nonlin. Processes Geophys.*, 10, 493–501, <https://doi.org/10.5194/npg-10-493-2003>.