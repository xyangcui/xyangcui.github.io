---
title: "Resolving problems of multiple testing"
description: "An introduction to multiple testing and how to resolve it."
publishDate: "23 August 2026"
tags: ["testing"]
draft: False
---
## What is multiple testing?

Assume we have a trend field of global surface air temperature (SAT). To test their statistical significance, our null hypothesis is $H_0$: the time series of SAT indeed has no trend. If the p-value satisfy $p<p_\alpha$, we can reject the null hypothesis at the $\alpha$ significance level. And the probability of committing a type I error is $\alpha$ (false positive, $p(H_0\text{ is denied}|H_0\text{ is true})$). **If we conduct $N$ independent tests simultanously, thanks to the type I error, it is expected to have $\alpha N$ points being falsly significant, which would lead to research results being overstated (Livezey and Chen 1983)**. 

## Walker's test

### Description

Walker (1914) realized that an extreme value of a sample statistic (e.g., a small p value) is progressively more likely to be observed as more realizations of the statistic (e.g., more hypothesis tests) are examined, so that **a progressively stricter standard for statistical significance must be imposed as the number of tests increases**.

### Technical details

The Walker's significance level can be defined as
$$
\begin{equation}
\alpha_{walker}=1-(1-\alpha_0)^{1/N_0},
\end{equation}
$$
where $N_0$ is the number of true null hypothesis. To limit the probability of erroneously rejecting any true null hypothesis to the level of $\alpha_0$, only those tests having p values smaller than $\alpha_{walker}$ would be regarded as significant according to this criterion.

### Argument

The Eq. (1) strongly needs the individual tests are statistically independent, which is almost impossible for gridded climate data.

## Field significance

### Description

The field significance approach casts the problem of evaluating multiple hypothesis tests as **a metatest, or a global hypothesis test** whose input data are the results of N local hypothesis tests (Von Storch 1982; Livezey and Chen 1983). 

### Technical details

The global null hypothesis is that all of local null hypothesis are true. In the idealized case that all local null hypothesis are statistically independent, the binominal distribution (see Eq. 1) allows calculation of the minimum number of locally significant tests required to reject a global null hypothesis.

$$
\begin{equation}
Pr(x)=\dfrac{N_{0}!}{x!(N_{0}-x)!}\alpha^{x}(1-\alpha)^{N_{0}-x}, x=0,1,...,N_0
\end{equation}
$$
where $x$ is the number of rroneously rejected tests, $N_0$ is the number of independent test and $Pr$ is the probabilities for the possible numbers of erroneously rejected tests $x$.

If the number of point satisfying $p<\alpha$ is larger than the number $n$ required by $Pr(n)=\alpha_{global}$, we then reject the global null hypothesis at the $\alpha_{global}$ significance level and believe some local null hypothesis are statistically rejected.

However, **previous thought requires local tests are statistically independent, which is impossible for gridded climate data**. To resolve this, some studies use the **Monte Carlo thinking** to design elaborate and computationally affordable experiments, while conserving the spatial and temporal correlation of gridded climate data.

### Argument

The field significance approach has some drawbacks.
- First, **such approach doesn't utilize much avaliable information**. It often uses points of local tests only, yet neglecting their p-value. Exactly, a small p-value contributes more than a larger one when resolving the problem of multiple testing. This problem is particularly acute when the fraction of false null hypotheses is small.
- Second, the approach can only provide information like there are, or not points fasly significant. We still fail to **exactly know which points are fasly significant**.

## False Discover Rate

### Description

- The FDR is **the statistically expected (i.e., average over analyses of hypothetically many similar testing situations) fraction of local null hypothesis test rejections (“discoveries”)** for which the respective null hypotheses are actually true (Benjamini and Hochberg 1995).

:::note
For instance, in one test we have 20 local null hypothesis being rejected ("discoveries"), and 4 tests are false discoveries. We have the False discovery portion (FDP) as: $FDP=V/R=4/20=20%$. Then, we repeat such tests 100 times and have FDPs $FDP_i i=1,...,100$. Then, the FDR is defined as the average of FDP $FDR=E[V/R]$.
:::

- An upper limit for this fraction can be controlled exactly for independent local tests (and approximately for correlated local tests), **regardless of the unknown proportion N0/N of local tests having true null hypotheses**.

### Technical details

Assume we have $N$ tests and their related p value $p_i$, $i=1,2,...,N$. The following procedure is known as Benjamini–Hochberg（BH）procedure. It uses the therom that $FDR\le \alpha_{FDR}\dfrac{N_0}{N} \le \alpha_{FDR}$.
- First, sort these p value in ascending order, get $p_{(1)}<p_{(2)}<...<p_{(N)}$.
- Second, take $\alpha_{FDR}$, we can get a global adjusted critera of p value: $p^*_{FDR}=\max\limits_{i=1,...,N} [p_{(i)}:p_{(i)} \le (i/N)\alpha_{FDR}]$.
- Third, **if $p<p^*_{FDR}$, we reject the local null hypothesis at $\alpha$ significance level more confidently**. In addition, the FDR procedure can be interpreted as an approach to field significance. **If none of the sorted p values satisfy the inequality $p<p^*_{FDR}$, then none of the respective null hypotheses can be rejected**, implying also nonrejection of the global null hypothesis that they compose. We can also see $\alpha_{FDR}$ as $\alpha_{global}$ in the procedure of field significance.

### Argument

- The FDR procedure is approximately valid even when those results are strongly correlated.
- **For data grids exhibiting moderate to strong spatial correlation, approximately correct global test levels can be produced using the FDR procedure by choosing $\alpha_{FDR}=2\alpha_{global}$ (Wilks 2016)**.

### References

Benjamini, Y., and Y. Hochberg, 1995: Controlling the  false discovery rate: A practical and powerful approach to multiple testing. *J. Roy. Stat. Soc.*, 57B, 289–300.

Livezey, R. E., and W. Y. Chen, 1983: Statistical field significance and its determination by Monte Carlo techniques. *Mon. Wea. Rev.*, 111, 46–59, <https://doi.org/10.1175/1520-0493(1983)1110046:SFSAID2.0.CO;2>.

von Storch, H., 1982: A remark on Chervin-Schneider’s algorithm to test significance of climate experiments with GCM’s. *J. Atmos. Sci.*, 39, 187–189, <https://doi.org/10.1175/15200469(1982)0390187:AROCSA2.0.CO;2>.

Walker, G. T., 1914: Correlation in seasonal variations  of weather. III. On the criterion for the reality of relationships or periodicities. *Mem. Indian Meteor. Dept.*, 21 (9), 13–15.

Wilks, D. S., 2016: “The Stippling Shows Statistically Significant Grid Points”: How Research Results are Routinely Overstated and Overinterpreted, and What to Do about It. Bull. Amer. Meteor. Soc., 97, 2263–2273, <https://doi.org/10.1175/BAMS-D-15-00267.1>.

Wilks, D. S., 2006: On “field significance” and the false discovery rate. *J. Appl. Meteor. Climatol.*, 45, 1181–1189, <https://doi.org/10.1175/JAM2404.1>.
