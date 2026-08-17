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

### Conditional Nonlinear Optimal Perturbations

#### Development of linear dynamics

Determination of the fastest growing initial perturbations in numerical weather and climate prediction and in the atmospheric research is of central importance. The linear approach was firstly considered both theoretically and practically. **It assumes the initial perturbation is sufficiently small that its evolution can be governed by the tangent linear model (TLM) of an nonliear system.** Based on this assumption, Linear singular vectors (LSV) and linear singular values (LSVA) were introduced by Lorenz (1965) to investigate the predictability of the atmospheric motion. Such thinking was also shown in practical use, for example, the Singular Vectors (SVs), a well-known method to perturb initial values to generate a forecast ensemble, which has been used by the Europe Centre of Median-Range Forecast (ECMWF) to produce the best forecast in the world.

#### A natural extension from linear dynamics

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

The "constrained" means changing the requirment, the method requires $\lVert \bm{u}_0^* \rVert \le \delta$. Such conditional nonlinear optimal perturbation (CNOP) is considered because it is **difficult to check this requirement** for complicated governing equations of atmosphere and ocean (Mu et al. 2003). And further research (Mu et al. 2003) suggested that such condition is reasonable and may get **faster, more realistic perturbation** than unconstrained methods in searching for the fastest perturbation. For example, unconstrained perturbation may reach $5\,^\circ\mathrm{C}$ or higher temperature anomalies of ENSO, which is unrealistic, but grows slower than the conditional nonlinear optimal perturbation.

### Nonlinear Local Lyapunov Exponent

#### Linear Lyapunov exponent: A metric to quantify predictability

For a series of simple models (e.g., Logistic mapping, Lorenz systems and Rössler systems), their predictability were thought to continuely follow initial error. **The smaller initial error was, the longer are their predictability.** To estimate the predictability limit, pioneers used the leading Lyapunov exponent to draw this. **Lyapunov exponent measures the segretion rate of two orbits, quantifying whether a system is choatic.** Its mathematical form originates from $\lvert \delta\bm{Z}(t) \rvert \approx \mathrm{e}^{\lambda t} \lvert \delta\bm{Z}(0) \rvert $, where $\lambda$ is the lyapunov exponent.

Based on the definition of this metric, they believed the timescale of predictability can be defined as ${T}_p=\lambda^{-1}\ln(\delta/\delta_0)$, where $\lambda$ is the leading lyapunov exponent, $\delta$ is the upper limit of error and $\delta_0$ is inital error. However, linear error dynamics is limited. For instance, the following figure shows how the error of logistic map evolves with different initial error. We can see linear evolution is reasonable only at the begining stage. Then it will grows nonliearly and finally reach a plateau. And **the larger initial error is, the shorter the linearity persists**. To investigate the relationship between the predictable time limit of chaotic systems and the initial error, the research on predictability should be based on the principle of nonlinear error growth dynamics.

![error growth of logistic map](/images/post/predictability/logistic.jpg)

#### An extension to nonlinear dynamics

To overcome the limitation of linear dynamics, some researchers introduce the concept of nonliear local lyapunov exponent (NLLE), developing a theory called "nonliear growth of initial error" (Ding and Li 2007; 2008; 2009). Assume we have a nonliear dynamical system like (1) and $\delta\bm{x}(t_0)$ is the initial error.

We can get the function describing how this error grows as:

$$
\begin{equation}
\dfrac{\mathrm{d}}{\mathrm{d}t}\delta\bm{x}(t) = \bm{J}(\bm{x}(t))\delta\bm{x}(t) + \bm{G}(\bm{x}(t), \delta\bm{x}(t)),
\end{equation}
$$
where the first term of rhs represents tangent linear, and the second is nonliear terms at high order.

Integerate (4), we obtain exact form of the error as:

$$
\begin{equation}
\delta\bm{x}(t_0+\tau) = \bm{\eta}(\bm{x}(t_0),\delta\bm{x}(t_0),\tau)\delta\bm{x}(t_0),
\end{equation}
$$

where $\bm{\eta}$ is the nonliear operator of how error evolves.

From (5), we now can define the mathmatic form of NLLE:

$$
\begin{equation}
\lambda(\bm{x}(t_0),\delta\bm{x}(t_0),\tau) = \tau^{-1}\ln{\dfrac{\left\| \delta\bm{x}(t_0+\tau) \right\|}{\left\| \delta\bm{x}(t_0) \right\|}},
\end{equation}
$$

where we can see the exponent is associated with its initial value (location), initial error and time of integration. The exponent, therefore, is called nonliear, local lyapunov exponent.

Since previous NLLE is related to the initial state, here an averaged NNLE is introduced to study dynamics of the entire system:

$$
\begin{equation}
\bar{\lambda}(\delta\bm{x}(t_0),\tau) = \langle \lambda(\bm{x}(t_0),\delta\bm{x}(t_0),\tau) \rangle _n,
\end{equation}
$$

where $\langle \cdot \rangle _n$ denotes the ensemble mean of $n\text{ }(n\to\infty)$ samples.

Use (7) we can define the averaged relative growth of error as:

$$
\begin{equation}
E(\delta\bm{x}(t_0),\tau)=\exp{(\bar{\lambda}(\delta\bm{x}(t_0),\tau)\tau)}.
\end{equation}
$$

Bring (6) into (8) and assume each sample has the same value of inital error $\lambda(t_0)$, we have:

$$
\begin{equation}
E(\delta\bm{x}(t_0),\tau)=(\prod_{i=1}^{n} \delta_i(t_0+\tau))^{1/n}/\lambda(t_0).
\end{equation}
$$

For a chaotic system, different errors converge to the same distribution. Therefore, the average relative growth of the error converges to a constant in a probabilistic sense (Ding and Li 2007), that is

$$
\begin{equation}
E(\delta\bm{x}(t_0),\tau)\stackrel{P}{\rightarrow}c \text{     } (n\to\infty).
\end{equation}
$$

It means that, once $c$ is approached, prediction is meaningless since the error will not depend on the initial state, or, the initial information is totally lost. The integrating time when it reaches $c$ can be determined as the predictability limit of the dynamical system.

## View2: Evolution of both signal and noise

## Reference

Lorenz, E. N., 1965: A study of the predictability of a 28-variable atmospheric model. *Tellus*, 17(3), 321–333. <https://doi.org/10.3402/tellusa.v17i3.9076>.

Mu, M., 2000: Nonlinear singular vectors and nonlinear singular values. *Sci. China Ser. D-Earth Sci*. 43, 375–385. <https://doi.org/10.1007/BF02959448>.

Mu, M., Duan, W. S., and Wang, B., 2003: Conditional nonlinear optimal perturbation and its applications, *Nonlin. Processes Geophys.*, 10, 493–501. <https://doi.org/10.5194/npg-10-493-2003>.

Duan, W., Yang, L., Mu, M. et al., 2023: Recent Advances in China on the Predictability of Weather and Climate. *Adv. Atmos. Sci.*, 40, 1521–1547. <https://doi.org/10.1007/s00376-023-2334-0>.

Ding Ruiqiang, Li Jian-Ping. 2007: Nonlinear Error Dynamics and Predictability Study. *Chinese Journal of Atmospheric Sciences*, 31(4), 571-576. <https://doi.org/10.3878/j.issn.1006-9895.2007.04.02>.丁瑞强, 李建平. 2007: 误差非线性的增长理论及可预报性研究. *大气科学*, 31(4): 571-576.

Ding Ruiqiang, Li Jian-Ping, 2008: Study on the regularity of predictability limit of chaotic systems with different initial errors. *Acta Physica Sinica*, 57(12), 7494-7499. <https://doi.org/10.7498/aps.57.7494>.
丁瑞强, 李建平. 混沌系统可预报期限随初始误差变化规律研究. *物理学报*, 2008, 57(12): 7494-7499.

Ding Ruiqiang, Li Jianping, 2009: Application of nonlinear error growth dynamics in studies of atmospheric predictability. *Acta Meteorologica Sinica*, 67(2), 241-249. <https://doi.org/10.11676/qxxb2009.024>.丁瑞强, 李建平.  非线性误差增长理论在大气可预报性中的应用. *气象学报*, 2009, 67(2): 241-249.

