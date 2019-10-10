<template>
  <div id="app">
    <!--   Title of non-current sections to appear on hovering above respective number in navbar     -->
    <div id="hoverTitleSpace" :style="{left: mouseX +'px'}" v-show="hoverTitle !== false">
        {{hoverTitle}}
    </div>
    <!--    Left Side of Window - containing mainly text    -->
    <div class="vis-container left" id="left-container">
        <!--     Dynamic Navigation Bar and Section Headings       -->
        <div class="" id="progress-container">

            <div id="banner-dummy">
                <a href="https://www.imperialvisualisations.com/learn/" title="Return to Homepage">
                    <img id="vis-logo" src="images/VisualisationsLogoWhite2.png">
                </a>
            </div>
            <!--    Journey Toggle Button   -->
            <div id="journeyToggle">
                <div id="navBlock" :class="[showJourney === false ? 'navBlockActive' : '']"
                     @click="toggleJourney">
                    CLICK HERE TO SHOW TEXT AND NAVIGATION
                </div>
                <div :class="[showJourney === false ? 'rotated' : '', 'innerJourneyToggle']"
                     @click="toggleJourney" class="chevron-holder" title="Hide/Show Left Panel">
                    <i class="fas fa-chevron-left"></i>
                </div>
            </div>
            <!--    Dynamic Section Heading Text - overlaid on meters    -->
            <!--    Also act as buttons to navigate between sections    -->
            <div class="" id="overlay" @mousemove="hoverTitle !== false ? updateMouseX($event) : ''">
                <button :class="[currentTitle === 1 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle1"
                        key="sectionTitle1" data-no=1 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[0]}}
                </button>
                <button :class="[currentTitle === 2 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle2"
                        key="sectionTitle2" data-no=2 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[1]}}
                </button>
                <button :class="[currentTitle === 3 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle3"
                        key="sectionTitle3" data-no=3 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[2]}}
                </button>
                <button :class="[currentTitle === 4 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle4"
                        key="sectionTitle4" data-no=4 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[3]}}
                </button>
                <button :class="[currentTitle === 5 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle5"
                        key="sectionTitle5" data-no=5 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[4]}}
                </button>
                <button :class="[currentTitle === 6 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle6"
                        key="sectionTitle6" data-no=6 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[5]}}
                </button>
                <button :class="[currentTitle === 7 ? 'activeButton' : '', 'overlay-button']" id="sectionTitle7"
                        key="sectionTitle7" data-no=7 @click="scrollTo($event)"
                        @mouseover="hoverPosUpdate($event); selectHover();" @mouseout="hoverTitle=false">
                    {{sectionTitle[6]}}
                </button>
            </div>
            <!--    Dynamic meters indicating progress through each section    -->
            <meter :class="[currentTitle === 1 ? 'activeMeter' : '']" id="m1" :min="sectionTops[0]"
                   :max="sectionBottoms[0]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 2 ? 'activeMeter' : '']" id="m2" :min="sectionTops[1]"
                   :max="sectionBottoms[1]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 3 ? 'activeMeter' : '']" id="m3" :min="sectionTops[2]"
                   :max="sectionBottoms[2]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 4 ? 'activeMeter' : '']" id="m4" :min="sectionTops[3]"
                   :max="sectionBottoms[3]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 5 ? 'activeMeter' : '']" id="m5" :min="sectionTops[4]"
                   :max="sectionBottoms[4]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 6 ? 'activeMeter' : '']" id="m6" :min="sectionTops[5]"
                   :max="sectionBottoms[5]" :value="scrollPos"></meter>
            <meter :class="[currentTitle === 7 ? 'activeMeter' : '']" id="m7" :min="sectionTops[6]"
                   :max="sectionBottoms[6]" :value="scrollPos"></meter>
        </div>
        <!--    Container for text content split into sections    -->
        <div :class="[showJourney === false ? 'hiddenJourney' : '', 'journey']" id="main-journey" @scroll.passive="scrollFunc">
            <!--    Section Text Containers   -->
            <div class="section-container" id="sc1">
                <div class="placeholder" id="ph1">
                    <hr>
                    <h2 class="text section-head" id="s1">
                        {{sectionTitleLong[0]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p1">
                    A Fourier Series is an expansion of any reasonable (see Dirichlet conditions) periodic function
                    <span class="mathJaxInline">$ f(x) $</span> in terms of an infinite sums of sines and cosines,
                    due to the orthogonality relationships of sines and cosines functions.
                    Any set of functions that form a complete orthogonal system has a Fourier Series counterpart.
                    <br><br>
                    By representing functions in sines and cosines, we have a wide range of tools (differentiation and
                    integration) for analysis that might not be possible in the original function domain.
                    <br><br>
                    In this visualisation, we aim to provide a visual approach to understanding how some
                    important periodic functions can be composed using sine and cosine functions.
                    <br><br>
                    <h3 class="section-sub-head">
                        Visualisation Guide
                    </h3>
                    On the right, we can see a square function, and a summation of sines and cosine functions with a
                    finite number of terms that represents the square function.
                    <br><br>
                    Try changing the number of terms in the Fourier Series.
                    By increasing this, we can see that the function resembles closer and closer to the square function.
                    <br><br>
                    By the end of this suite, you would be able to understand the intuition behind Fourier Series, and
                    to do it yourself for any reasonable periodic function.
                </div>
            </div>
            <div class="section-container" id="sc2">
                <div class="placeholder" id="ph2">
                    <hr>
                    <h2 class="text section-head" id="s2">
                        {{sectionTitleLong[1]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p2">
                    Given the vectors <span class="mathJaxInline">$ \vec{V}_{n} $</span> and <span
                        class="mathJaxInline">$ \vec{V}_{m}, $</span> we define their
                    inner product as
                    <span class="mathJaxDisplay">
                            $$\vec{V}_{n} \cdot \vec{V}_{m} = \sum_{i}V_{n}^{(i)} V_{m}^{(i)}, $$
                        </span>
                    where <span class="mathJaxInline">$ V_{n}^{(i)} $</span> is the <span class="mathJaxInline">$ i^{\text{th}} $</span>
                    component of the vector
                    <span class="mathJaxInline">$ \vec{V}_{n}. $</span> If
                    <span class="mathJaxDisplay">
                            $$ \vec{V}_{n} \cdot \vec{V}_{m} = 0 \text{ for } m \neq n, $$
                        </span>
                    then we say the vectors are <strong>orthogonal</strong>.
                    <br><br>
                    If you move in the direction of any vector <span class="mathJaxInline">$ \vec{a}, $</span> you do
                    not change the position
                    component in the direction of any vector
                    orthogonal to <span class="mathJaxInline">$ \vec{a}. $</span> In other words, orthogonal vectors are
                    perpendicular.
                    <!--(... talk about definition of orthogonality)-->
                    <br><br>
                    If <span class="mathJaxInline">$ \vec{V}_{n} \cdot \vec{V}_{m} = \delta_{nm} $</span> then the
                    vectors are said to be
                    <strong>orthonormal</strong>.
                    <span class="mathJaxDisplay">
                            $$ \delta_{nm} = \left\{\begin{matrix}0 \quad \text{if } m\neq n
                            \\ 1 \quad \text{if } m = n
                            \end{matrix}\right. $$
                        </span>
                    This mean the vectors are orthogonal and conveniently normalised.
                    <br><br>
                    Use the visualisation to see that when the basis vectors are not parallel they span <span
                        class="mathJaxInline">$ \mathbb{R}^{2}, $</span>
                    using these as basis vectors, we can construct any other vector in <span class="mathJaxInline">$ \mathbb{R}^{2}. $</span>
                    <br><br>
                    If you can represent any vector in <span class="mathJaxInline">$ \mathbb{R}^{n} $</span> using <span
                        class="mathJaxInline">$ n $</span> vectors,
                    then the basis vectors form a <strong>complete set</strong>.
                    If the set of these vectors are all orthonormal, then we have a <strong>complete orthonormal
                    set</strong>.
                    <br><br>
                    In the same way as before, we will now demonstrate what it means for <strong>functions</strong> to
                    be complete.
                    We define the functions <span class="mathJaxInline">$ f_{n},f_{m} $</span> to exist on the domain
                    <span class="mathJaxInline">$ \left[a,b \right]. $</span>
                    <br><br>
                    We define their inner product to be
                    <span class="mathJaxDisplay">
                            $$ \langle  f_{n} , f_{m} \rangle = \int_{a}^{b} f_{n}\left(x \right)f_{m}^{*}\left(x \right)dx $$
                        </span>, where * denotes the complex conjugate of the function. This is commutative, just like
                    the inner product of two vectors.
                    We say the functions are <strong>orthogonal</strong> if <span class="mathJaxInline">$ \langle  f_{n} , f_{m} \rangle = 0 $</span>
                    for <span class="mathJaxInline">$ m \neq n. $</span>
                    <br><br>
                    We then say the functions are <strong>orthonormal</strong> if <span class="mathJaxInline">$ \langle  f_{n} , f_{m} \rangle = \delta_{nm}, $</span>
                    where <span class="mathJaxDisplay">
                            $$ \delta_{nm} = \left\{\begin{matrix}0 \quad \text{if } m\neq n
                            \\ 1 \quad \text{if } m = n
                            \end{matrix}\right. $$
                        </span>
                    We now claim that you can construct any square integrable function from a <strong>complete
                    set</strong> of basis
                    functions, in the same way vectors could be constructed from a complete set of basis vectors. A
                    square integrable function <span class="mathJaxInline">$ f $</span> is
                    a function whose inner product with itself, <span
                        class="mathJaxInline">$ \langle f,f \rangle $</span> is finite.

                </div>
            </div>
            <div class="section-container" id="sc3">
                <div class="placeholder" id="ph3">
                    <hr>
                    <h2 class="text section-head" id="s3">
                        {{sectionTitleLong[2]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p3">
                    <div id="intro" class="divclass">
                        <button id="ssh1" class="section-sub-head first-sub-head" key="ssh1"
                                @click="updateSubSection(1); subScrollTo($event)" data-toggle="collapse"
                                data-target="#introContentContainer"
                                :style="derivationSubSection === 1 ? 'background-color: #eaf2ff;' : ''">
                            Basics and Definition <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="introContentContainer" class="collapse show" data-parent="#p3">
                            <div id="introContent" class="section-sub-content" key="introContent">
                                Consider a function <span class="mathJaxInline">$ f(x) $</span> which is periodic over
                                the domain <span class="mathJaxInline">$ -L \leq x &lt; L $</span>
                                where <span class="mathJaxInline">$ L $</span> is positive. <span class="mathJaxInline">$ f(x) $</span>
                                can be represented as a sum
                                of
                                sines and cosines with varying
                                frequencies.
                                <br><br>
                                These trigonometric functions form orthogonal basis.
                                <br><br>
                                The Fourier series of <span class="mathJaxInline">$ f(x) $</span> is
                                <span class="mathJaxDisplay">
                                        $$ f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \Big[ a_n\cos\Big(\frac{\pi nx}{L}\Big) + b_n\sin\Big(\frac{\pi nx}{L}\Big) \Big] $$
                                    </span>
                                where
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        a_n & = \frac{1}{L}\int_{-L}^{L} f(x) \cos\Big(\frac{\pi nx}{L}\Big) dx, \\
                                        b_n & = \frac{1}{L}\int_{-L}^{L} f(x) \sin\Big(\frac{\pi nx}{L}\Big) dx, \\
                                        \end{align}
                                    </span>
                                and
                                <span class="mathJaxDisplay">
                                        $$ n=0,1,2... $$
                                    </span>
                                <strong> Note:</strong> <span class="mathJaxInline">$ {a_0}/2 $</span> represents the
                                average value of <span class="mathJaxInline">$ f(x). $</span>
                                <br><br>
                                The Fourier series representation of the function <span
                                    class="mathJaxInline">$ f(x) $</span> in exponential
                                (complex) form is
                                <span class="mathJaxDisplay">
                                        $$ f(x) =\sum_{n=-\infty}^{\infty} c_n e^{{in \pi x}/L} \qquad $$
                                    </span>
                                where
                                <span class="mathJaxDisplay">
                                        $$ c_n = \frac{1}{2L}\int_{-L}^{L} f(x) e^{{-in \pi x}/L} dx, $$
                                    </span>
                                <strong>Note:</strong> The constants in front of the integral(s) of the coefficient for
                                the trigonometric and exponential fourier series are different. Also note the limit of
                                the
                                summations. Follow through the derivation to understand the difference.
                            </div>
                        </div>
                    </div>
                    <div id="FSderivation" class="divclass">
                        <button id="ssh2" class="section-sub-head collapsed" key="ssh2"
                                @click="updateSubSection(2); subScrollTo($event)" data-toggle="collapse"
                                data-target="#FSderivationContentContainer"
                                :style="derivationSubSection === 2 ? 'background-color: #eaf2ff;' : ''">
                            General Derivation <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="FSderivationContentContainer" class="collapse show" data-parent="#p3">
                            <div id="FSderivationContent" class="section-sub-content" key="FSderivationContent">
                                We begin by assuming that <span class="mathJaxInline">$ f(x) $</span> can be represented
                                as a sum of
                                exponential terms.
                                <span class="mathJaxDisplay">
                                        $$ f(x) = \sum_{n=-\infty}^{\infty} c_n e^{{in \pi x}/L} $$
                                    </span>
                                Multiplying by <span class="mathJaxInline">$ e^{{-im \pi x}/L}, $</span> where <span
                                    class="mathJaxInline">$ m=0,1,2,..., $</span>
                                and integrating both sides gives the following:
                                <span class="mathJaxDisplay">
                                        $$ \int_{-L}^{L} f(x) e^{{-im \pi x}/L} dx = \sum_{n=-\infty}^{\infty} c_n \int_{-L}^{L} e^{{i(n-m) \pi x}/L} dx. $$
                                    </span>
                                Performing the integral on the R.H.S gives
                                <span class="mathJaxDisplay" style="font-size: 90%">
                                        $$ \int_{-L}^L e^{(i\pi x/L)(n-m)}dx =\left\{ \begin{array}{ll} 2L \qquad \text{(if n=m)} \\
                                        0 \qquad \quad \text{(if n≠m)} \end{array} \right \}=2L\cdot\delta_{nm}. $$
                                    </span>
                                This is the orthonormality of complex exponentials.
                                <br><br>
                                Now since the only non-zero value of the sum is when <span
                                    class="mathJaxInline">$ n=m, $</span>
                                <span class="mathJaxDisplay">
                                        $$ \int_{-L}^L f(x) e^{-im\pi x/L}dx = 2L \sum_{n=-\infty}^{+\infty}c_n\delta_{mn} = 2L\cdot c_m, $$
                                    </span>
                                hence
                                <span class="mathJaxDisplay">
                                        $$ c_m=\frac{1}{2L}\int_{-L}^{+L}f(x) e^{-im\pi x/L}dx. $$
                                    </span>
                                <strong>Note:</strong> As <span class="mathJaxInline">$ m $</span> is an arbitrary
                                integer, it can be assigned
                                as <span class="mathJaxInline">$ n $</span> for simplicity.
                                <br><br>
                                Given the previously derived equation, we can derive the trigonometric form of the
                                Fourier series. By reorganising the sum, we get
                                <span class="mathJaxDisplay">
                                        $$ f(x)= \underbrace{c_0}_\text{n=0} + \sum_{n=1}^{\infty} \big( \underbrace{c_n e^{in\pi x/L}}_\text{Positive n term} + \underbrace{c_{-n} e^{-in\pi x/L}}_\text{Negative n terms} \big). $$
                                    </span>
                                We can regroup the terms in the summation in the following way:
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#regroupexplainContainer"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="regroupexplainContainer" class="collapse show extra-content-container">
                                    <div id="regroupexplain" class="extra-content">
                                            <span class="mathJaxDisplay">
                                                \begin{align}
                                                = \frac{1}{2} \Big[  2c_n e^{in\pi x/L} + 2c_{-n} e^{-in\pi x/L} & \\
                                                + \underbrace{c_{-n} e^{in\pi x/L} - c_{-n} e^{in\pi x/L}}_\text{ =0} & \\
                                                + \underbrace{c_{n} e^{-in\pi x/L} -c_{n} e^{-in\pi x/L}}_\text{ =0} & \Big] \\
                                                \end{align}
                                                <br>
                                                \begin{align}
                                                = \frac{1}{2} \Big[ c_n e^{in\pi x/L} +c_{-n} e^{in\pi x/L} & \\
                                                + c_n e^{-in\pi x/L} + c_{-n} e^{-in\pi x/L} & \\
                                                + c_n e^{in\pi x/L} - c_{-n} e^{in\pi x/L} & \\
                                                - c_n e^{-in\pi x/L} + c_{-n} e^{-in\pi x/L} & \Big] \\
                                                \end{align}
                                            </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        f(x)= c_0 + \sum_{n=1}^{\infty} \Big[ & \frac{c_n + c_{-n}}{2} \big(e^{in\pi x/L} +e^{-in\pi x/L} \big) \\
                                        & \frac{c_n - c_{-n}}{2} \big(e^{in\pi x/L} -e^{-in\pi x/L} \big) \Big]
                                        \end{align}
                                    </span>
                                Now define <span class="mathJaxInline">$ a_n = c_n + c_{-n} $</span> and
                                <span class="mathJaxInline">$ b_n = i(c_n - c_{-n}) $</span>
                                and use that these exponentials can we written as
                                sines and cosines.
                                <br><br>
                                <strong>Note:</strong> <span class="mathJaxInline">$ a_0 = 2c_0 $</span> and <span
                                    class="mathJaxInline">$ b_0=0. $</span>
                                <br><br>
                                Hence
                                <span class="mathJaxDisplay">
                                        $$ f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \Big[ a_n\cos\Big(\frac{\pi nx}{L}\Big) + b_n\sin\Big(\frac{\pi nx}{L}\Big) \Big] $$
                                    </span>
                                <span class="mathJaxInline">$ a_n $</span> can be derived by using the expression from
                                <span class="mathJaxInline">$ c_n $</span>
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        a_n = c_n + c_{-n} = & \frac{1}{2L}\int_{-L}^{+L}f(x) e^{-in\pi x/L}dx \\
                                        + & \frac{1}{2L} \int_{-L}^{+L}f(x) e^{in\pi x/L}dx
                                        \end{align}
                                    </span>
                                Factorise and spot the exponential form of <span class="mathJaxInline">$ \cos. $</span>
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        & =\frac{1}{L}\int_{-L}^{+L}f(x) \Big[\frac{e^{in\pi x/L} +e^{-in\pi x/L}}{2}\Big]dx \\
                                        & =\frac{1}{L}\int_{-L}^{L} f(x) \cos\Big(\frac{\pi nx}{L}\Big) dx
                                        \end{align}
                                    </span>
                                Similarly for <span class="mathJaxInline">$ b_n, $</span>
                                <span class="mathJaxDisplay">
                                        $$ b_n =\frac{1}{L}\int_{-L}^{L} f(x) \sin\Big(\frac{\pi nx}{L}\Big) dx. $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="triangular1" class="divclass">
                        <button id="ssh3" class="section-sub-head collapsed" key="ssh3"
                                @click="updateSubSection(3); subScrollTo($event)" data-toggle="collapse"
                                data-target="#triangular1ContentContainer"
                                :style="derivationSubSection === 3 ? 'background-color: #eaf2ff;' : ''">
                            Triangular Function Part 1 <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="triangular1ContentContainer" class="collapse show" data-parent="#p3">
                            <div id="triangular1Content" class="section-sub-content" key="triangular1Content">
                                The triangular function is defined by the following:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\left\{
                                        \begin{array}{ll}
                                        \frac{-2A}{L} (x+L) \quad (-L \leq x &lt; -L/2) \\
                                        \frac{2A}{L} x \qquad \qquad (-L/2\leq x &lt; L/2) \\
                                        \frac{-2A}{L} (x-L) \quad (L/2\leq x &lt; L)
                                        \end{array}
                                        \right. $$
                                    </span>
                                First notice that <span class="mathJaxInline">$ f(x) $</span> is odd about <span
                                    class="mathJaxInline">$ x=0, $</span> hence <span
                                    class="mathJaxInline">$ a_n=0 $</span>
                                for all <span class="mathJaxInline">$ n. $</span> Also, since the <span
                                    class="mathJaxInline">$ b_n $</span> integrand is even about
                                <span class="mathJaxInline">$ x=0, $</span>
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{2}{L}\int_0^L f(x) \sin \left(\frac{n \pi x}{L}\right)dx. $$
                                    </span>
                                Notice that for even <span class="mathJaxInline">$ n, $</span> <span
                                    class="mathJaxInline">$ b_n $</span> is odd about
                                <span class="mathJaxInline">$ x=L/2. $</span>
                                Hence,
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{2}{L}\int_0^{L} f(x) \sin \left(\frac{n\pi x}{L} \right) dx = 0 \quad \text{for even n}. $$
                                    </span>
                                The integral from <span class="mathJaxInline">$ 0 $</span> to <span
                                    class="mathJaxInline">$ L/2 $</span> is equal in magnitude but
                                opposite in sign to the integral from <span class="mathJaxInline">$ L/2 $</span> to
                                <span class="mathJaxInline">$ L, $</span> for
                                even <span class="mathJaxInline">$ n. $</span>
                                <br><br>
                                For odd <span class="mathJaxInline">$ n, $</span> the function is even around <span
                                    class="mathJaxInline">$ L/2, $</span> so we only
                                have to integrate from <span class="mathJaxInline">$ 0 $</span> to <span
                                    class="mathJaxInline">$ L/2 $</span> then multiply by
                                <span class="mathJaxInline">$ 2. $</span> This has made our job much easier.
                                <span class="mathJaxDisplay">
                                        $$ b_n=2\frac{2}{L}\int_0^{L/2} f(x) \sin \left(\frac{n\pi x}{L} \right) dx \quad \text{for odd n} $$
                                    </span>
                                Play around with the visualisation to the right to convince yourself this is true.
                            </div>
                        </div>
                    </div>
                    <div id="triangular2" class="divclass">
                        <button id="ssh4" class="section-sub-head collapsed" key="ssh4"
                                @click="updateSubSection(4); subScrollTo($event)" data-toggle="collapse"
                                data-target="#triangular2ContentContainer"
                                :style="derivationSubSection === 4 ? 'background-color: #eaf2ff;' : ''">
                            Triangular Function Part 2 <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="triangular2ContentContainer" class="collapse show" data-parent="#p3">
                            <div id="triangular2Content" class="section-sub-content" key="triangular2Content">
                                    <span class="mathJaxDisplay">
                                        $$ \text{For 0 &lt; x &lt; L/2:} \quad f(x)=\frac{2Ax}{L} $$
                                    </span>
                                Remembering that for even <span class="mathJaxInline">$ n, $</span> <span
                                    class="mathJaxInline">$ b_n=0, $</span> therefore only
                                consider odd <span class="mathJaxInline">$ n. $</span>
                                <span class="mathJaxDisplay">
                                        $$ b_n = \frac{4}{L} \frac{2A}{L}\int_0^{L/2} x \sin \left(\frac{n\pi x}{L} \right) dx $$
                                    </span>
                                This integral can be performed by parts.
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#BypartsTriangularContainer"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="BypartsTriangularContainer" class="collapse show extra-content-container">
                                    <div id="BypartsTriangular" class="extra-content">
                                            <span class="mathJaxDisplay">
                                                $$ u=x \qquad dv= \sin \left(\frac{n\pi x}{L} \right)dx $$
                                            </span>
                                        <span class="mathJaxDisplay">
                                                $$ du=dx \qquad v=\frac{-L}{n\pi} \cos \left(\frac{n\pi x}{L} \right) $$
                                            </span>
                                        <span class="mathJaxDisplay">
                                                \begin{align}
                                                b_n=\frac{8A}{L^2} \Bigg[ \Big[ \frac{-xL}{n\pi} & \cos \Big(\frac{n\pi x}{L}\Big) \Big] \Bigr|_0^{L/2} \\
                                                -\int_0^{L/2}\frac{-L}{n\pi} & \cos \Big(\frac{n\pi x}{L} \Big)dx \Bigg]
                                                \end{align}
                                            </span>
                                        For odd n,
                                        <span class="mathJaxDisplay">
                                                $$ \cos \left(\frac{n\pi}{2} \right)=0 $$
                                            </span>
                                        Therefore,
                                        <span class="mathJaxDisplay">
                                                $$ b_n=\frac{8A}{L^2} \Bigg[0+ \int_0^{L/2}\frac{L}{n\pi} \cos \left(\frac{n\pi x}{L}
                                                \right)dx \Bigg] $$
                                            </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{8A}{L^2} \frac{L^2}{(n\pi)^2} \sin \left(\frac{n\pi x}{L} \right) \biggr |_0^{L/2} $$
                                    </span>
                                Note for odd <span class="mathJaxInline">$ n $</span>:
                                <span class="mathJaxDisplay">
                                    $$ \sin \left(\frac{n\pi}{2} \right)=(-1)^{\frac{n-1}{2}} $$
                                    </span>
                                Therefore,
                                <span class="mathJaxDisplay">
                                    $$ b_n=\frac{8A}{n^2\pi^2}(-1)^{\frac{n-1}{2}} $$
                                    </span>
                                and,
                                <span class="mathJaxDisplay">
                                    $$ f(x)=\sum_{n=1,3,5...}^\infty \frac{8A}{n^2\pi^2} (-1)^{\frac{n-1}{2}} \sin \left(\frac{n\pi x}{L} \right) $$
                                    </span>
                                Finally, using the fact that odd number can be written as <span
                                    class="mathJaxInline">$ 2n +1 $</span> for any integer
                                <span class="mathJaxInline">$ n, $</span> we have
                                <span class="mathJaxDisplay" style="font-size: 90%">
                                    $$ f(x)=\sum_{n=1,2,3...}^\infty \frac{8A}{(2n-1)^2\pi^2}(-1)^n \sin \left(\frac{(2n-1)\pi x}{L} \right) $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="parabolic" class="divclass">
                        <button id="ssh5" class="section-sub-head collapsed" key="ssh5"
                                @click="updateSubSection(5); subScrollTo($event)" data-toggle="collapse"
                                data-target="#parabolicContentContainer"
                                :style="derivationSubSection === 5 ? 'background-color: #eaf2ff;' : ''">
                            Parabolic Function <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="parabolicContentContainer" class="collapse show" data-parent="#p3">
                            <div id="parabolicContent" class="section-sub-content" key="parabolicContent">
                                The parabolic function is defined as:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=Ax^2 \quad \text{for:} -L\leq x &lt; L $$
                                    </span>
                                and is forced to be periodic. <span class="mathJaxInline">$ A $</span> is a constant.
                                Therefore, the coefficients <span class="mathJaxInline">$ a_n $</span> and <span
                                    class="mathJaxInline">$ b_n $</span>
                                are given by
                                <span class="mathJaxDisplay">
                                        $$ b_n = \frac{1}{L}\int_{-L}^{+L} Ax^2 \sin \left(\frac{n \pi x}{L} \right)dx $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ a_n= \frac{1}{L}\int_{-L}^{+L} Ax^2 \cos \left(\frac{n \pi x}{L} \right)dx $$
                                    </span>
                                The <span class="mathJaxInline">$ b_n $</span> integral is odd about <span
                                    class="mathJaxInline">$ x=0, $</span> hence
                                <span class="mathJaxInline">$ b_n=0 $</span> for all <span
                                    class="mathJaxInline">$ n. $</span> <span class="mathJaxInline">$ f(x) $</span> is
                                even about
                                <span class="mathJaxInline">$ x=0. $</span> Thus,
                                <span class="mathJaxDisplay">
                                        $$ a_n=\frac{2}{L}\int_{0}^{+L} Ax^2 \cos \left(\frac{n \pi x}{L} \right)dx. $$
                                    </span>
                                For <span class="mathJaxInline">$ n=0 $</span>:
                                <span class="mathJaxDisplay">
                                        $$ a_0 = \frac{2}{L} \int _{0}^{+L} Ax^2 dx  = \frac{2AL^2}{3} $$
                                    </span>
                                For <span class="mathJaxInline">$ n\neq 0 $</span>:
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{2A}{L}\int_0^L x^2 \cos \left(\frac{n\pi x}{L} \right)dx $$
                                    </span>
                                This equation can now be solved using integration by parts.
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#ByPartsParabolic1Container"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="ByPartsParabolic1Container" class="collapse show extra-content-container">
                                    <div id="ByPartsParabolic1" class="extra-content">
                                        <span class="mathJaxDisplay">
                                            $$ du = 2x\cdot dx \qquad v=\frac{L}{n\pi} \sin \left(\frac{n\pi x}{L} \right) $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ u=x^2 \qquad dv= \cos \left(\frac{n \pi x}{L} \right)dx $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            \begin{align}
                                            a_n = \frac{2A}{L} \Bigg[ \Big[\frac{Lx^2}{n\pi} & \sin \left(\frac{n\pi x}{L} \right) \Big] \biggr |_0^L \\
                                            -\int_0^L\frac{2xL}{n\pi} & \sin \left(\frac{n \pi x}{L} \right)dx \Bigg]
                                            \end{align}
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ = \frac{2A}{L} \Bigg[0 -\int_0^L\frac{2xL}{n\pi} \sin\left(\frac{n \pi x}{L}\right)dx \Bigg] $$
                                        </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        $$ a_n = -\frac{4A}{n\pi}\int_{0}^{L} x \sin \left(\frac{n \pi x}{L} \right)dx $$
                                    </span>
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#ByPartsParabolic2Container"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="ByPartsParabolic2Container" class="collapse show extra-content-container">
                                    <div id="ByPartsParabolic2" class="extra-content">
                                        <span class="mathJaxDisplay">
                                            $$ u = x \qquad dv = \sin \left(\frac{n\pi x}{L} \right) dx $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ du = dx \qquad v = -\frac{L}{n\pi} \cos \left(\frac{n\pi x}{L} \right) $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            \begin{align}
                                            a_n = \frac{-4A}{n\pi} \Bigg[\Big[-\frac{xL}{n\pi} & \cos \left(\frac{n\pi x}{L} \right)\Big] \biggr |_0^L \\
                                            - \int_0^L\frac{-L}{n\pi} & \cos \left(\frac{n\pi x}{L} \right)dx \Bigg]
                                            \end{align}
                                        </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{4A}{n\pi} \Bigg[\frac{xL}{n\pi} \cos \left(\frac{n\pi x}{L} \right) \Bigg] \biggr |_0^L $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ = \frac{4AL^2}{n^2\pi^2}(-1)^n $$
                                    </span>
                                Therefore, the fourier series can be written as
                                <span class="mathJaxDisplay">
                                        $$ f(x) = \frac{AL^2}{3} + \sum_{n=1}^\infty \frac{4AL^2}{n^2\pi^2} (-1)^n \cos \left(\frac{n\pi x}{L} \right) $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="delta" class="divclass">
                        <button id="ssh6" class="section-sub-head collapsed" key="ssh6"
                                @click="updateSubSection(6); subScrollTo($event)" data-toggle="collapse"
                                data-target="#deltaContentContainer"
                                :style="derivationSubSection === 6 ? 'background-color: #eaf2ff;' : ''">
                            Dirac-Delta Function <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="deltaContentContainer" class="collapse show" data-parent="#p3">
                            <div id="deltaContent" class="section-sub-content" key="deltaContent">
                                The Dirac-delta function can be thought of as a infinite spike at <span
                                    class="mathJaxInline">$ x=0. $</span>
                                <span class="mathJaxDisplay">
                                        $$
                                        f(x) = \delta(x)=\left\{
                                        \begin{array}{ll}
                                        +\infty \quad (x=0) \\
                                        0 \qquad (x \neq 0)
                                        \end{array}
                                        \right.
                                        $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ a_n=\frac{1}{L}\int_{-L}^{+L} \delta (x) \cos \left(\frac{n\pi x}{L} \right)dx $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{1}{L}\int_{-L}^{+L}\delta(x) \sin \left(\frac{n\pi x}{L} \right)dx $$
                                    </span>
                                <span class="mathJaxInline">$ \delta(x) $</span> is an even function. Hence <span
                                    class="mathJaxInline">$ b_n=0 $</span> and
                                <span class="mathJaxDisplay">
                                        $$ a_n=\frac{1}{L} $$
                                    </span>
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#ByPartsDiracContainer"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="ByPartsDiracContainer" class="collapse show extra-content-container">
                                    <div id="ByPartsDirac" class="extra-content">
                                        By considering the shifting property of the Dirac-Delta function,
                                        <span class="mathJaxDisplay">
                                        $$ \int_{\alpha-\epsilon}^{\alpha+\epsilon} g(x) \delta(x-\alpha)dx=g(\alpha) $$
                                        </span>
                                        For us, <span class="mathJaxInline">$ \alpha=0, $</span> <span
                                            class="mathJaxInline">$ \epsilon=L, $</span> and <span
                                            class="mathJaxInline">$ g(x)= \sin \left(n \pi x/L \right). $</span>
                                        <br><br>
                                        Therefore,
                                        <span class="mathJaxDisplay">
                                        $$ a_n=\frac{1}{L}\cos \left(\frac{n\pi \times 0}{L} \right)=\frac{1}{L} $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                        $$ b_n=\frac{1}{L}\sin \left(\frac{n\pi \times 0}{L} \right)=0 $$
                                        </span>
                                    </div>
                                </div>
                                Therefore, the fourier series for positive <span class="mathJaxInline">$ L $</span> can
                                be written as
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\frac{1}{2L}+\sum_{n=1}^\infty \frac{1}{L} \cos \left(\frac{n\pi x}{L} \right). $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="square" class="divclass">
                        <button id="ssh7" class="section-sub-head collapsed" key="ssh7"
                                @click="updateSubSection(7); subScrollTo($event)" data-toggle="collapse"
                                data-target="#squareContentContainer"
                                :style="derivationSubSection === 7 ? 'background-color: #eaf2ff;' : ''">
                            Square Wave <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="squareContentContainer" class="collapse show" data-parent="#p3">
                            <div id="squareContent" class="section-sub-content" key="squareContent">
                                The square wave is defined as the following:
                                <span class="mathJaxDisplay">
                                        $$
                                        f(x)=\left\{
                                        \begin{array}{ll}
                                        -A \quad (-L \leq x &lt; 0) \\
                                        A \quad (0\leq x &lt; L)
                                        \end{array}
                                        \right.
                                        $$
                                    </span>
                                The <span class="mathJaxInline">$ a_{n} $</span> terms can be found be noting that <span
                                    class="mathJaxInline">$ f(x) $</span> is
                                odd,
                                so <span class="mathJaxInline">$ a_n $</span> is <span
                                    class="mathJaxInline">$ 0 $</span> for all <span class="mathJaxInline">$ n. $</span>
                                <br><br>
                                To find the <span class="mathJaxInline">$ b_n $</span> terms, the integration can be
                                split into two parts:
                                <span class="mathJaxInline">$ -L\leq x &lt; 0 $</span>
                                and <span class="mathJaxInline">$ 0\leq x &lt; L. $</span>
                                <br><br>
                                This gives the following integration:
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        b_n & =\frac{1}{L}\int_{-L}^0 -A \sin \left(\frac{n\pi x}{L} \right)dx \\
                                        & + \frac{1}{L}\int_0^L A \sin \left(\frac{n \pi x}{L} \right)dx
                                        \end{align}
                                    </span>
                                which can be evaluated to:
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{-2A}{L}\frac{L}{n\pi} \cos \left(\frac{n\pi x}{L} \right)\biggr |_0^L
                                        =\frac{2A}{n\pi}\left[1-\cos\left(n\pi \right) \right] $$
                                    </span>
                                Note that
                                <span class="mathJaxDisplay">
                                        $$ \cos \left(n \pi\right)=(-1)^n $$
                                    </span>
                                Hence
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{2A}{n\pi}(1-(-1)^n) $$
                                    </span>
                                Therefore the final fourier series is:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\sum_{n=1}^{\infty} \frac{2A}{n\pi} (1-(-1)^n)\sin \left(\frac{n\pi x}{L}\right). $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="sawtooth" class="divclass">
                        <button id="ssh8" class="section-sub-head collapsed" key="ssh8"
                                @click="updateSubSection(8); subScrollTo($event)" data-toggle="collapse"
                                data-target="#sawtoothContentContainer"
                                :style="derivationSubSection === 8 ? 'background-color: #eaf2ff;' : ''">
                            Sawtooth Wave <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="sawtoothContentContainer" class="collapse show" data-parent="#p3">
                            <div id="sawtoothContent" class="section-sub-content" key="sawtoothContent">
                                The Sawtooth wave is defined as the following:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\frac{Ax}{L}  \quad (-L \leq x &lt; L). $$
                                    </span>
                                <span class="mathJaxInline">$ f(x) $</span> is odd, so <span class="mathJaxInline">$ a_n= 0 $</span>
                                for all <span class="mathJaxInline">$ n. $</span>
                                <br><br>
                                The <span class="mathJaxInline">$ b_n $</span> terms are given by the following
                                integration:
                                <span class="mathJaxDisplay">
                                        \begin{align}
                                        b_n & =\frac{1}{L}\int_{-L}^{L} \frac{Ax}{L}\sin \left(\frac{n\pi x}{L} \right)dx \\
                                        & =\frac{2A}{L^{2}}\int_{0}^{L} x \sin \left(\frac{n\pi x}{L} \right)dx.
                                        \end{align}
                                    </span>
                                Using Integration by parts it can be shown that:
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#ByPartsSawtoothContainer"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="ByPartsSawtoothContainer" class="collapse show extra-content-container">
                                    <div id="ByPartsSawtooth" class="extra-content">
                                        <span class="mathJaxDisplay">
                                            $$ u=x \quad  dv=\sin \left(\frac{n\pi x}{L} \right)dx $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ du=dx \quad v=\frac{-L}{n\pi}\cos \left(\frac{n\pi x}{L} \right) $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            \begin{align}
                                            b_n=\frac{2A}{L^{2}} \Bigg[ \frac{-Lx}{n\pi} & \cos \left(\frac{n\pi x}{L} \right)\biggr |_0^L \\
                                            -\int_0^L\frac{-L}{n\pi} & \cos \left(\frac{n\pi x}{L} \right)dx \Bigg]
                                            \end{align}
                                        </span>
                                        Note that the second integrand is zero as it is of cosine over a full
                                        period.
                                        <span class="mathJaxDisplay">
                                            $$ b_n=-\frac{2A}{n\pi} \cos \left(n\pi \right)=-\frac{2A}{n\pi}(-1)^n $$
                                        </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        $$ b_n=\frac{2A}{n\pi}(-1)^{n+1}. $$
                                    </span>
                                Therefore the final fourier series is:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\sum_{n=1}^\infty \frac{2A}{n\pi}(-1)^{n+1} \sin \left(\frac{n\pi x}{L} \right). $$
                                    </span>
                            </div>
                        </div>
                    </div>
                    <div id="modx" class="divclass">
                        <button id="ssh9" class="section-sub-head collapsed" key="ssh9"
                                @click="updateSubSection(9); subScrollTo($event)" data-toggle="collapse"
                                data-target="#modxContentContainer"
                                :style="derivationSubSection === 9 ? 'background-color: #eaf2ff;' : ''">
                            Mod x Function <i class='fas fa-chevron-down'></i>
                        </button>
                        <div id="modxContentContainer" class="collapse show" data-parent="#p3">
                            <div id="modxContent" class="section-sub-content" key="modxContent">
                                The <span class="mathJaxInline">$ |x| $</span> function is defined as the following:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=A|x| \quad (-L \leq x &lt; L). $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{1}{L}\int_{-L}^{+L} A|x| \cos \left(\frac{n \pi x}{L} \right)dx $$
                                    </span>
                                <span class="mathJaxDisplay">
                                        $$ b_n = \frac{1}{L}\int_{-L}^{+L} A|x| \sin \left( \frac{n\pi x}{L}\right) dx $$
                                    </span>
                                <span class="mathJaxInline">$ f(x) $</span> is even about <span class="mathJaxInline">$ x=0. $</span>
                                Hence <span class="mathJaxInline">$ b_n=0. $</span>
                                The <span class="mathJaxInline">$ a_n $</span> integral is even about <span
                                    class="mathJaxInline">$ x=0. $</span> Hence,
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{2}{L}\int_{0}^{+L} Ax  \cos \left(\frac{n \pi x}{L}\right)dx. $$
                                    </span>
                                For <span class="mathJaxInline">$ n=0 $</span>
                                <span class="mathJaxDisplay">
                                        $$ a_0 = \frac{2A}{L}\int_0^L x dx = \frac{2A}{L}\frac{x^2}{2} \biggr |_0^L = AL. $$
                                    </span>
                                For <span class="mathJaxInline">$ n \neq 0 $</span>:
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{2A}{L}\int_{0}^{+L} x   \cos \left(\frac{n \pi x}{L} \right)dx. $$
                                    </span>
                                By integrating by parts,
                                <span class="section-extra-head-container">
                                        <button class="section-extra-head" data-toggle="collapse"
                                                @click="hideShowToggle($event)"
                                                data-target="#ByPartsModxContainer"> <span>Show</span> Full Calculation </button>
                                    </span>
                                <div id="ByPartsModxContainer" class="collapse show extra-content-container">
                                    <div id="ByPartsModx" class="extra-content">
                                        <span class="mathJaxDisplay">
                                            $$ u=x \qquad  dv= \cos\left(\frac{n\pi x}{L}\right)dx $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ du=dx \qquad  v=\frac{L}{n\pi} \sin \left(\frac{n\pi x}{L} \right) $$
                                        </span>
                                        <span class="mathJaxDisplay">
                                            \begin{align}
                                            a_n = \frac{2A}{L} \Bigg[ \Big[\frac{Lx}{n\pi} & \sin \left( \frac{n \pi x}{L} \right) \Big] \Biggr|_0^L \\
                                            -\int_0^{+L} \frac{L}{n\pi} & \sin \left(\frac{n \pi x}{L} \right)dx \Bigg]
                                            \end{align}
                                        </span>
                                        <span class="mathJaxDisplay">
                                            $$ a_n = \frac{2A}{L} \Bigg[ 0  -\int_0^{+L}\frac{L}{n\pi}  \sin \left(\frac{n\pi x}{L} \right)dx \Bigg] $$
                                        </span>
                                    </div>
                                </div>
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{2A}{L}\frac{L^2}{(n\pi)^2}  \cos \left( \frac{n\pi x}{L} \right)\biggr |_0^L . $$
                                    </span>
                                Hence,
                                <span class="mathJaxDisplay">
                                        $$ a_n = \frac{2A}{L}\frac{L^2}{(n\pi)^2}  \left[(-1)^n-1 \right] = \frac{2AL}{(n\pi)^2}\left[(-1)^n-1 \right]. $$
                                    </span>
                                Therefore the final fourier series is:
                                <span class="mathJaxDisplay">
                                        $$ f(x)=\frac{AL}{2}+ \sum_{n=1}^\infty \frac{2AL}{(n\pi)^2} \left[(-1)^n-1 \right]  \cos \left(\frac{n\pi
                                        x}{L} \right). $$
                                    </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-container" id="sc4">
                <div class="placeholder" id="ph4">
                    <hr>
                    <h2 class="text section-head" id="s4">
                        {{sectionTitleLong[3]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p4">
                    The 0<sup>th</sup> term of the series, <span class="mathJaxInline">$ \frac{a_0}{2}, $</span> is the
                    constant term before the sum.
                    <br><br>
                    This is labelled as the 0<sup>th</sup> term so that the series may start indexing its terms from
                    <span class="mathJaxInline">$ n=1. $</span>
                    <span class="mathJaxDisplay">
                            $$ f(x)=\frac{a_0}{2}+\sum_{n=1}^{\infty}a_n \cos\left(\frac{n\pi x}{L}\right)+b_n \sin\left(\frac{n \pi x}{L}\right) $$
                        </span>
                    If the function is not periodic, then we may cut the function, forcing it to be periodic over some
                    <span class="mathJaxInline">$ -L &lt; x &lt; L. $</span> This means that we can prescribe a Fourier series
                    that is now valid for the function over the selected range. If we take the limit as <span
                        class="mathJaxInline">$ L \rightarrow \infty, $</span>
                    then a Fourier transform need be used. This is a different problem entirely!
                </div>
            </div>
            <div class="section-container" id="sc5">
                <div class="placeholder" id="ph5">
                    <hr>
                    <h2 class="text section-head" id="s5">
                        {{sectionTitleLong[4]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p5">
                    <h3 class="section-sub-head first-sub-head">
                        Decomposition of a function into odd and even parts
                    </h3>
                    Representing a function in terms of a trigonometric Fourier series is analogous to representing a
                    vector in
                    terms of basis vectors. Here sines and cosines are our basis functions, we have a method for finding
                    the projection
                    of the function in the direction of each basis function (<span
                        class="mathJaxInline">$ a_{n} $</span> and
                    <span class="mathJaxInline">$ b_{n} $</span> are the "projections" of <span class="mathJaxInline">$ f(x) $</span>
                    onto
                    <span class="mathJaxInline">$ \sin\left(\frac{n\pi x}{L} \right) $</span> and <span
                        class="mathJaxInline">$ \cos\left(\frac{n \pi x}{L} \right) $</span>
                    respectively).
                    <br><br>
                    This visualisation shows how the first ten terms are introduced to the series, notice that
                    usually as the number of terms included in the series increases, new terms become less
                    significant (their amplitude decreases).
                    <h3 class="section-sub-head">
                        Power Spectrum
                    </h3>
                    The power spectrum form is a different representation of a continuous signal.
                    <br><br>
                    One can think of a signal as a sound wave that is a superposition of different frequencies <span
                        class="mathJaxInline">$ \omega_n, $</span>
                    each with amplitude <span class="mathJaxInline">$ \alpha_n, $</span> and relative phases <span
                        class="mathJaxInline">$ \theta_n. $</span>
                    Any signal of period <span class="mathJaxInline">$ 2L $</span> can be decomposed in terms of the
                    amplitude and relative
                    phase of its discrete frequency modes. Its two parameters <span
                        class="mathJaxInline">$ \alpha_n $</span> and <span class="mathJaxInline">$ \theta_n, $</span>
                    enable us to measure the amount of
                    each frequency <span class="mathJaxInline">$ \omega_n=\frac{n\pi}{L} $</span>contained in the
                    signal, and the relative
                    phase difference between the <span class="mathJaxInline">$ n^{th} $</span> frequency and a cosine
                    wave centered at <span class="mathJaxInline">$ x=0. $</span>
                    This is simply a different way to represent a signal
                    rather than decomposing it into its even and odd parts.
                    <span class="mathJaxDisplay">
                           $$ f(x) = \frac{a_0}{2} + \sum_{n=1}^{\infty}\alpha_n \cos\bigg(\frac{n\pi x}{L} - \theta_n\bigg) $$
                        </span>
                    <span class="mathJaxDisplay">
                            $$ \alpha_n = \sqrt{a^2_n + b^2_n} $$
                        </span>
                    <span class="mathJaxDisplay">
                            $$ \theta_n = \tan^{-1} \bigg(\frac{b_n}{a_n}\bigg) $$
                        </span>
                    For some even functions, when the period transitions from 0 to negative, the value of
                    <span class="mathJaxInline">$ \theta_n $</span> change from <span class="mathJaxInline">$ 0 $</span>
                    to <span class="mathJaxInline">$ \pi $</span> or vice versa. Why
                    do you think
                    this happens?
                    <span class="section-extra-head-container">
                            <button class="section-extra-head" data-toggle="collapse" @click="hideShowToggle($event)"
                                    data-target="#evenThetaAnswerContainer"> <span>Show</span> Answer </button>
                        </span>
                    <div id="evenThetaAnswerContainer" class="collapse show extra-content-container">
                        <div id="evenThetaAnswer" class="extra-content">
                            This happens because the value of <span class="mathJaxInline">$ a_n $</span> changes sign
                            (<span class="mathJaxInline">$ b_n $</span> is 0) causing the value of
                            <span class="mathJaxInline">$ \theta_n $</span> to change. For <span class="mathJaxInline">$ b_n = 0, $</span>
                            <span class="mathJaxInline">$ \tan^{-1}(\frac{b_n}{a_n}) $</span>
                            can be both
                            0 or <span class="mathJaxInline">$ \pi $</span> depending on whether <span
                                class="mathJaxInline">$ a_n $</span> is positive or
                            negative. Not all even functions exhibit this.
                            The parabola for example, has its <span class="mathJaxInline">$ a_n $</span> proportional to
                            <span class="mathJaxInline">$ L^2, $</span> so its sign does not change when <span
                                class="mathJaxInline">$ L $</span> changes
                            sign.
                        </div>
                    </div>
                    <h3 class="section-sub-head">
                        Orthogonal functions
                    </h3>
                    Two functions <span class="mathJaxInline">$ f $</span> and <span class="mathJaxInline">$ g $</span>
                    are said to be orthogonal if their inner
                    product <span class="mathJaxInline">$ \langle f,g\rangle $</span> is 0. Just like basis vectors in a
                    finite vector space,
                    a set of orthogonal functions can form an infinite basis in a function space and a linear sum of
                    these basis functions can describe any function in that function space.
                    <br><br>
                    For functions that are periodic over <span class="mathJaxInline">$ -L &lt; x \leq L $</span> with a
                    period of
                    <span class="mathJaxInline">$ 2L, $</span> the fourier components <span class="mathJaxInline">$ \rightarrow $</span>
                    <span class="mathJaxInline">$ \sin(\frac{\pi x}{L}), \cos(\frac{\pi x}{L}),
                        \sin(\frac{2\pi x}{L}), \cos(\frac{2\pi x}{L})... $</span> and so on form a complete orthogonal
                    set that can be used to describe these functions. This means that increasing the amplitude of one of
                    the components does not affect the other components, so changing the amount of any frequency
                    contained
                    in a signal leaves all the other frequencies unaffected.
                </div>
            </div>
            <div class="section-container" id="sc6">
                <div class="placeholder" id="ph6">
                    <hr>
                    <h2 class="text section-head" id="s6">
                        {{sectionTitleLong[5]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p6">
                    <h3 class="section-sub-head first-sub-head">
                        Description
                    </h3>
                    Finally, you can see the components of the series, the power spectrum
                    and the resultant Fourier series displayed all at once.
                    You can select one of the example functions from the previous sections, or input your own custom
                    function,
                    and see how all the elements work together to build a Fourier series.
                    <h3 class="section-sub-head">
                        How To Use Custom Functions
                    </h3>
                    To specify a custom function, select custom from the drop down menu and input your desired function
                    into the
                    input for <span class="mathJaxInline">$ f(x). $</span>
                    <br><br>
                    The period slider forces the function you have specified to be periodic over
                    <span class="mathJaxInline">$ -L &lt; x \leq L. $</span>
                    For example if <span class="mathJaxInline">$ f(x) = \sin(x) $</span> with <span
                        class="mathJaxInline">$ L = 1, $</span> this is the sine
                    function but cut at <span class="mathJaxInline">$ x = \pm 1 $</span> and forced
                    to be periodic over just this range (not the full <span class="mathJaxInline">$ 2\pi $</span>
                    period).
                    <br><br>
                    The following functions can be used:
                    <br><br>
                    <ul>
                        <li>Trigonometric functions (e.g. sin(), cos())</li>
                        <li>Trigonometric inverses (e.g. arcsin(), arccos())</li>
                        <li>Hyperbolic functions (e.g. sinh(), cosh())</li>
                        <li>Hyperbolic inverses (e.g. arsinh(), arcosh())</li>
                        <li>Exponentials and logs (e.g. exp(), log())</li>
                    </ul>
                    <h3 class="section-sub-head">
                        Syntax
                    </h3>
                    Entering <span class="mathJaxInline">$ 5x $</span> does not work: instead you should write 5*x.
                    <br><br>
                    Write exponents as a^(exponent), so <span class="mathJaxInline">$ x^2 $</span> is written as x^2.
                    <br><br>
                    Functions should be real and fully defined over the domain, for example <span class="mathJaxInline">$ log(x) $</span>
                    is
                    imaginary
                    for values less than zero, so does not work.
                    <br><br>
                    <span class="mathJaxInline">$ log(x+1) $</span> does not work either (with a period of 1), since log
                    is undefined at zero,
                    however
                    <span class="mathJaxInline">$ log(1+x^2) $</span> does work for all periods, since it is defined
                    over the whole domain and
                    is real.
                    <!-- Not true - this was fixed. -->
                    <!-- <br><br>
                    Sometimes due to the numerical integration methods used, the power spectrum shows very small values
                    (<span class="mathJaxInline">$ 10^{-17} $</span>).
                    These are simply due to the inexact integration and should be treated as zero. -->
                </div>
            </div>
            <div class="section-container" id="sc7">
                <div class="placeholder" id="ph7">
                    <hr>
                    <h2 class="text section-head" id="s7">
                        {{sectionTitleLong[6]}}
                    </h2>
                    <hr>
                </div>
                <div class="text section-body odd" id="p7">
                    In a Fourier Series, if the range over which the function is periodic, <span class="mathJaxInline">$ L $</span>
                    goes to infinity, this function is no longer periodic.
                    To treat such a function, we would use Fourier Transform.
                    <br><br>
                    At its core, the Fourier Transform converts the function from one domain to another.
                    <br><br>
                    For example, by performing a Fourier Transform of a wave packet in the time domain,
                    we can transform the wave packet into the frequency domain. This can make analysis (such as
                    differentiation) much easier than performing it in the original domain.
                    <br><br>
                    One major application of Fourier Transform is in sound signal editing. Sound data is picked up by a
                    microphone which records the pressure variation of air against time.
                    When a Fourier Transform is performed, the relative intensities of the constituent frequencies that
                    make up the signal is broken down, making it easier for
                    sound correction and timbre analysis.
                    <br><br>
                    <h3 class="section-sub-head">
                        Visualisation Guide
                    </h3>
                    On the left, we see a top-hat function that we intend to perform a Fourier Transform on.
                    The graph on the right shows the Fourier Transform of the top hat function. We have represented the
                    top hat graph in the frequency space.
                    <br><br>
                    The Fourier Transform graph gives the relative "intensity" of the respective frequencies that make
                    up the top-hat graph.
                    <br>
                </div>
            </div>
        </div>
    </div>
    <!--    Right Side of Window - containing mainly interactive and visual content    -->
    <div class="vis-container right" id="right-container">
        <!--    Title Banner above Right Side    -->
        <div class="banner">
            <!--    Visualisation Title    -->
            <h1 class="" id="vis-title">
                UNDERSTANDING FOURIER SERIES
            </h1>
        </div>
        <!--    Space into which visualisations are loaded    -->
        <div id="rightloadSpace">
            <!--    fade transition tag for RHS - applied by Vue and CSS    -->
            <transition-group name="fade" tag="div" class="transition-container">
                <!--    Interactive Zone Containers   -->
                <div class="rightload text odd" id="loadout1Container" key="loadout1Container"
                     v-if="currentSection === 1">
                    <iframe src="./Right-Sec0-Introduction.html" class="rightload text" id="iframe1"></iframe>
                </div>
                <div class="rightload text even" id="loadout2Container" key="loadout2Container"
                     v-if="currentSection === 2">
                    <iframe src="./Right-Sec1-Orthogonality.html" class="rightload text" id="iframe2"></iframe>
                </div>
                <div class="rightload text odd" id="loadout3Container" key="loadout3Container"
                     v-if="currentSection === 3">
                    <transition name="fade">
                        <!--Interactive Zone Sub Containers-->
                        <div id="loadout2sub0Container" key="loadout2sub0Container" v-if="derivationSubSection !== 3">
                            <iframe src="./Right-Sec2-Sub0-FourierExamples.html" class="rightload text"
                                    id='iframe3-1'></iframe>
                        </div>
                        <div id="loadout2sub1Container" key="loadout2sub3Container" v-else>
                            <iframe src="./Right-Sec2-Sub1-OddEven.html" class="rightload text"
                                    id='iframe3-2'></iframe>
                        </div>
                    </transition>
                </div>
                <div class="rightload text even" id="loadout4Container" key="loadout4Container"
                     v-if="currentSection === 4">
                    <iframe src="./Right-Sec3-Components.html" class="rightload text" id="iframe4"></iframe>
                    <!--Equation Space-->
                    <div id="equationSpace" key="equationSpace"
                         v-if="showEq && currentSection === 4">
                        <div id="Triangle_eqn" class="equationContainer" v-if="equationID === 'triangular'">
                            <img src="images/Triangle_Eqn.png">
                        </div>
                        <div id="Square_eqn" class="equationContainer" v-else-if="equationID === 'square'">
                            <img src="images/Square_Eqn.png">
                        </div>
                        <div id="Sawtooth_eqn" class="equationContainer" v-else-if="equationID === 'sawtooth'">
                            <img src="images/Sawtooth_Eqn.png">
                        </div>
                        <div id="Dirac_eqn" class="equationContainer" v-else-if="equationID === 'dirac'">
                            <img src="images/Dirac_Eqn.png">
                        </div>
                        <div id="Parabola_eqn" class="equationContainer" v-else-if="equationID === 'parabola'">
                            <img src="images/Parabola_Eqn.png">
                        </div>
                        <div id="Modx_eqn" class="equationContainer" v-else-if="equationID === 'mode'">
                            <img src="images/Modx_Eqn.png">
                        </div>
                    </div>
                    <!--Scroll-down-->
                    <div id="scrollSec3" key="scrollSec3"
                         v-if="showEq && currentSection === 4">
                        <strong>Select Function: </strong>
                        <select id="SelectSec3" v-model="equationID"
                                oninput="document.getElementById('iframe4').contentWindow.setPlotTypeSec3()">
                            <option value="triangular">Triangular Function</option>
                            <option value="square">Square Function</option>
                            <option value="sawtooth">Sawtooth Function</option>
                            <option value="dirac">Dirac-Delta Function</option>
                            <option value="parabola">Parabola Function</option>
                            <option value="mode">|x| Function</option>
                        </select>
                    </div>
                </div>
                <div class="rightload text odd" id="loadout5Container" key="loadout5Container"
                     v-if="currentSection === 5">
                    <iframe src="./Right-Sec4-PowerSpectrum.html" class="rightload text" id="iframe5"></iframe>
                </div>
                <div class="rightload text even" id="loadout6Container" key="loadout6Container"
                     v-if="currentSection === 6">
                    <iframe src="./Right-Sec5-Overview.html" class="rightload text" id="iframe6"></iframe>
                </div>
                <div class="rightload text odd" id="loadout7Container" key="loadout7Container"
                     v-if="currentSection === 7">
                    <iframe src="./Right-Sec6-FourierTransform.html" class="rightload text" id="iframe7"></iframe>
                </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import {debounce} from './assets/debounce_and_throttle.js';

export default {
    name: 'app',
    data(){
        return {
        // Data required including variables associated with visible sections, script paths and booleans reflecting state of vis
        scrollPos: 0,
        currentTitle: 0,
        currentSection: 0,
        sectionTops: [],
        sectionBottoms: [],
        sectionTitleLong: ["Introduction", "Orthogonality", "Derivation", "Components", "Power Spectrum", "Overview", "Fourier Transform"],
        sectionTitleShort: ["1", "2", "3", "4", "5", "6", "7"],
        sectionTitle: [],
        hoverPos: '',
        hoverTitle: false,
        mouseX: '',
        n: "",
        journeyHeightOld: "",
        journeyHeightNew: "",
        firstRunDone: false,
        derivationSubSection: 1,
        showEq: true,
        equationID: "triangular",
        showJourney: true,
    }},
    methods: {

        // Function called on scrolling of of left panel to indicate distance scrolled down journey content div
        scrollFunc: function () {
            // function only works once sectionPos has run at least once (in mounted)
            if (this.firstRunDone === true) {
                this.scrollPos = document.querySelectorAll(".journey")[0].scrollTop;
                this.changeTitle();
                this.changeSec();
            }
        },

        handleElement: function (section) {
            // update currentSection variable if user scrolls past the top edge of its corresponding section on left side
            if (this.scrollPos >= this.sectionTops[section - 1] && this.scrollPos < this.sectionBottoms[section - 1]) {
                this.currentTitle = section;
            }
        },

        changeTitle: function () {
            for (let i = 1; i <= this.n; i++) {
                this.handleElement(i)
            }
        },

        changeSec: debounce(function () {
            this.currentSection = this.currentTitle;
        }, 200),

        swapTitles: function (newValue, oldValue) {
            for (let i = 1; i <= this.n; i++) {
                if (i !== newValue) {
                    this.sectionTitle[i - 1] = this.sectionTitleShort[i - 1];
                } else {
                    setTimeout(function () {
                        this.sectionTitle[i - 1] = this.sectionTitleLong[i - 1];
                    }, 20);
                    setTimeout(function () {
                        this.$forceUpdate();
                    }, 100);
                }
            }
        },

        // Function called every x seconds to check if section div sizes have changed and recalculate scroll positions if so
        // Div sizes may change if window re-sized or if a subsection is expanded/collapsed
        sectionPos: function () {
            this.$nextTick(function () {
                let overallTop = document.querySelectorAll("#sc1")[0].offsetTop;
                for (let i = 1; i <= this.n; i++) {
                    if (i < this.n) {
                        this.sectionTops[i - 1] = (document.querySelectorAll("#" + "sc" + i)[0].offsetTop - overallTop);
                        this.sectionBottoms[i - 1] = (this.sectionTops[i - 1] + document.querySelectorAll("#" + "sc" + i)[0].offsetHeight);
                    } else {
                        this.sectionTops[i - 1] = (document.querySelectorAll("#" + "sc" + i)[0].offsetTop - overallTop);
                        this.sectionBottoms[i - 1] = (this.sectionTops[i - 1] + document.querySelectorAll("#" + "sc" + i)[0].offsetHeight - document.querySelectorAll(".journey")[0].offsetHeight);
                    }
                }
                this.firstRunDone = true;
                this.scrollFunc();
            })
        },

        // Function activated when button in nav/progress bar clicked to scroll automatically to relevant section
        scrollTo: function (event) {
            document.querySelectorAll("#" + "ph" + event.currentTarget.dataset.no + " " + "hr")[0].scrollIntoView({behavior: "smooth"});
        },

        // Same as above but for subsections
        subScrollTo: function (event) {
            let scrollTarget = event.currentTarget;
            if (scrollTarget.id === "ssh" + this.derivationSubSection) {
                scrollTarget.scrollIntoView();
            }
        },

        // Updates number of title being hovered over in nav/progress bar in data
        hoverPosUpdate: function (event) {
            this.hoverPos = parseFloat(event.currentTarget.dataset.no)
        },

        // Updates if and what title show when hovering over nav/progress bar
        selectHover: function () {
            if (this.currentTitle !== this.hoverPos) {
                this.hoverTitle = this.sectionTitleLong[this.hoverPos - 1]
            } else {
                this.hoverTitle = false
            }
        },

        // Updates derivationSubSection variable to reflect active subsection in derivation section
        updateSubSection: function (newSubSection) {
            if (this.derivationSubSection !== newSubSection) {
                this.derivationSubSection = newSubSection;
            } else {
                this.derivationSubSection = 0;
            }
            this.$forceUpdate();
        },

        // Updates x-position of mouse in data
        updateMouseX: function (event) {
            // pass event object, bound to mouse move with update
            this.mouseX = event.clientX - 15;
        },

        // Toggles button text from 'hide' to 'show' depending on state
        hideShowToggle: function (event) {
            let toggleTarget = event.currentTarget.querySelectorAll('span')[0].innerHTML;
            if (toggleTarget === "Show") {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Hide"
            } else {
                event.currentTarget.querySelectorAll('span')[0].innerHTML = "Show"
            }
        },

        // toggles visibility of journey section
        toggleJourney: function () {
            let sectionCache = this.currentSection;
            document.querySelectorAll("#rightloadSpace")[0].classList.add("rightLoadInterim");
            this.showJourney = !this.showJourney;
            setTimeout(function () {
                if (this.showJourney === false) {
                    document.querySelectorAll("#rightloadSpace")[0].classList.add("fullRightLoadSpace");
                } else {
                    document.querySelectorAll("#rightloadSpace")[0].classList.remove("fullRightLoadSpace");
                }
                this.currentSection = "noShow";
            }, 500);
            setTimeout(function () {
                this.currentSection = sectionCache;
                document.querySelectorAll("#rightloadSpace")[0].classList.remove("rightLoadInterim");
            }, 525);
        },
    },

    watch: {

        // Updates current section title to display in full in nav/progress bar whilst minimising other section titles
        currentTitle: function (newValue, oldValue) {
            this.swapTitles(newValue, oldValue)
        },

        currentSection: function (newValue, oldValue) {
            if (newValue === 3) {
                if (this.derivationSubSection !== 3) {
                    // locks function displayed to show only specific example if subsection about specific function is active
                    setTimeout(function () {
                        let iframeTarget = document.querySelectorAll("#iframe3-1")[0].contentWindow;
                        if (this.derivationSubSection > 3) {
                            iframeTarget.document.querySelectorAll('#opt' + (this.derivationSubSection - 3))[0].setAttribute("selected", "true");
                            iframeTarget.document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                            iframeTarget.document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                            setTimeout(function () {
                                iframeTarget.selectorFuncSec2Sub0();
                                iframeTarget.document.querySelectorAll("#subSecTitle")[0].innerHTML = iframeTarget.document.querySelectorAll("#opt" + (this.derivationSubSection - 3))[0].title;
                                iframeTarget.document.querySelectorAll("#subSecTitle")[0].style.display = "block";
                            }, 200);
                        }
                    }, 1000);
                }
            }
        },

        derivationSubSection: function (newValue, oldValue) {
            if (this.currentSection === 3) {
                if (newValue !== 3) {
                    // locks function displayed to show only specific example if subsection about specific function is active
                    setTimeout(function () {
                        let iframeTarget = document.querySelectorAll("#iframe3-1")[0].contentWindow;
                        if (iframeTarget.document.querySelectorAll('option.selected')[0]) {
                            iframeTarget.document.querySelectorAll('option.selected')[0].removeAttribute("selected");
                        }
                        if (oldValue > 3) {
                            iframeTarget.document.querySelectorAll('#SelectSec2Sub1')[0].removeAttribute("disabled");
                            iframeTarget.document.querySelectorAll("#subSecTitle")[0].style.display = "none";
                            iframeTarget.document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "flex";
                        }
                        if (newValue > 3) {
                            iframeTarget.document.querySelectorAll('#opt' + (newValue - 3))[0].setAttribute("selected", "true");
                            iframeTarget.document.querySelectorAll('#SelectSec2Sub1')[0].setAttribute("disabled", "true");
                            iframeTarget.document.querySelectorAll('#scrollSec2Sub1')[0].style.display = "none";
                            setTimeout(function () {
                                iframeTarget.selectorFuncSec2Sub0();
                                iframeTarget.document.querySelectorAll("#subSecTitle")[0].innerHTML = iframeTarget.document.querySelectorAll("#opt" + (newValue - 3))[0].title;
                                iframeTarget.document.querySelectorAll("#subSecTitle")[0].style.display = "block";
                            }, 200);
                        } else {
                            if (oldValue > 3) {
                                iframeTarget.document.querySelectorAll('#opt' + (oldValue - 3))[0].setAttribute("selected", "true");
                            }
                        }
                    }, 200);
                }
            }
        },

        equationID: function () {
            // changes to correct equation to display in section 4 (depending on dropdown selection)
            this.showEq = false;
            setTimeout(
                function () {
                    this.showEq = true
                }, 50);
        },
    },

    mounted() {

        // $nextTick ensures initial functions only run once Vue is initialised sufficiently
        this.$nextTick(function () {
                // makes n equal to total number of sections
                this.n = document.querySelectorAll(".section-container").length;
                // calculates initial div section positions in journey with respect to the top
                this.sectionPos();
                // checks if journey div height changes every x seconds
                // if it does change, re-runs sectionPos to calculate section div positions
                this.journeyHeightOld = document.querySelectorAll(".journey")[0].scrollHeight;
                window.setInterval(() => {
                    this.journeyHeightNew = document.querySelectorAll(".journey")[0].scrollHeight;
                    if (this.journeyHeightOld !== this.journeyHeightNew) {
                        this.journeyHeightOld = this.journeyHeightNew;
                        this.sectionPos();
                    }
                }, 2000);
                // collapses collapsible divs once mathJax has loaded fully
                setTimeout(function () {
                    MathJax.Hub.Queue(function () {
                        let collapseDivs = document.querySelectorAll(".collapse:not(#introContentContainer)");
                        for (let i = 0; i < collapseDivs.length; i++) {
                            collapseDivs[i].classList.remove("show");
                        }
                    })
                }, 1000)
            }
        )
    }
}
</script>

<style>
* {
    box-sizing: border-box;
    font-family: "Fira Sans", sans-serif;
}

.mathJaxHeading {
    font-size: 1.6vw;
    padding: 0 1vw;
}

.mathJaxDisplay {
    display: table;
    margin: 10px auto;
    font-size: calc(4px + 0.95vw);
    text-align: center;
}

.mathJaxInline {
    font-size: calc(4px + 0.95vw);
}

.mathJaxList {
    display: inline-block;
    width: 2vw;
    text-align: left;
}

.vis-container {
    float: left;
    display: flex;
    flex-direction: column;
}

iframe {
    border: none;
    width: 100%;
    height: 100%;
}

ul li, ol li {
    list-style-position: outside;
    font-weight: bolder;
}

ul li p, ol li p {
    font-weight: normal;
    padding-left: 1vw;
}

.li-head {
    padding: 1vh 0 1vh 0;
}

#sc7 {
    min-height: 110vh;
}

/* LEFT SIDE STYLES */

.left {
    height: 100vh;
    width: 33vw;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 5;
}

#progress-container {
    display: flex;
    flex: 0 0 auto;
    width: 33vw;
    height: 4vh;
    min-height: 30px;
    /*position: fixed;*/
    left: 0;
    top: 0;
    border: none;
    z-index: 6;
}

meter {
    visibility: visible;
    flex-basis: 0;
    flex-grow: 1;
    border: none;
    height: 4vh;
    min-height: 30px;
    min-width: 30px;
    transition: flex-grow 450ms ease;
}

meter::-webkit-meter-bar {
    background: none; /* Required to get rid of the default background property */
    background-color: #37578b;
    box-shadow: 0 0.5 vhpx 0.5vh -0.5 vhpx #333 inset;
}

meter::-webkit-meter-optimum-value {
    box-shadow: 0 5px 5px -5px #999 inset;
    height: 0.4vh;
    min-height: 3px;
    background: #ff1447;
    background-size: 100% 100%;
}

meter {
    /* Firefox */
    background: none; /* Required to get rid of the default background property */
    background-color: #37578b;
    box-shadow: 0 0.5 vhpx 0.5vh -0.5 vhpx #333 inset;
}

meter::-moz-meter-bar {
    box-shadow: 0 5px 5px -5px #999 inset;
    height: 0.4vh;
    min-height: 3px;
    background: #ff1447;
    background-size: 100% 100%;
}

.activeMeter {
    flex-grow: 6;
}

#overlay {
    display: flex;
    height: 4vh;
    min-height: 30px;
    width: inherit;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
}

.overlay-button {
    height: 4vh;
    min-height: 30px;
    flex-basis: 0;
    flex-grow: 1;
    margin: 0;
    padding: 0;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
    font-size: calc(3px + 0.75vw);
    background: none;
    color: #ffffff !important;
    border: none;
    min-width: 30px;
    transition: flex-grow 450ms ease;
    z-index: 8;
    box-shadow: none;
}

.activeButton {
    flex-grow: 6;
    color: #ffffff !important;
    /*font-size: 14pt;*/
    font-size: calc(4px + 0.95vw);
    /*letter-spacing: 2pt;*/
}

.activeButton:hover {
    color: #ffffff !important;
    font-size: calc(5px + 1.05vw);
    background-color: unset;
}

.overlay-button:not(.activeButton):hover {
    color: #ffffff !important;
    font-size: calc(4px + 0.95vw);
    background-color: unset;
}

#hoverTitleSpace {
    position: fixed;
    top: calc(40px + 1.5vh);
    left: 0;
    font-size: 12pt;
    width: fit-content;
    height: fit-content;
    padding: 0.5vh 0.5vw;
    border-radius: 0.5vh;
    background: #000000;
    color: #ffffff;
    z-index: 6;
    box-shadow: 2px 2px 2px 1px #888888;
}

#hoverTitleSpace::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 10px;
    margin-left: -5px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #000000 transparent;
    z-index: 6;
}

.journey {
    flex: 1 1 auto;
    width: inherit;
    height: 100%;
    padding: 0;
    /*position: fixed;*/
    background: #ffffff;
    overflow-y: auto !important;
    overflow-x: hidden;
    text-align: justify;
    box-shadow: 0 0 5px #a8a8a8;
    transition: transform 0.4s ease-in-out;
}

.hiddenJourney {
    transform: translateX(-40vw);
}

.section-body {
    margin: 0;
    padding: 2vh 0 0 0;
    font-size: calc(4px + 0.95vw);
    text-align: justify;
}

.section-container {
    width: inherit;
    padding: 1vw 2vw 0 1vw;
    margin-bottom: 100px;
}

.section-head {
    color: #003E74;
    margin: 0;
    padding: 10px 0;
    font-size: 2.3vw;
    text-align: center;
    font-weight: bolder;
}

hr {
    box-sizing: content-box;
    border: none;
    height: 1px;
    background: #033482;
    background-clip: content-box;
    padding: 1vh 0;
    margin: 0;
}

.placeholder {
    margin-bottom: 3vh;
}

button.section-sub-head {
    width: 100%;
    position: relative;
    margin: 10px 0 20px 0;
    text-align: center;
    font-size: 1.4vw;
    border: solid 1px #033482;
    color: #033482;
    box-shadow: none;
}

button.section-sub-head:hover {
    background-color: #eaf2ff;
}

.nav-tabs {
    display: flex;
    width: inherit;
    position: relative;
    top: 8px;
    margin: 0;
}

.nav-tabs > li {
    display: flex;
    flex-direction: column;
    flex-basis: 0;
    flex-grow: 1;
    border-radius: 0.5vh 0.5vh 0 0;
    text-align: center;
    background: #ffffff;
    align-items: stretch;
    z-index: 1;
    font-weight: bolder;
}

.nav-tabs.innerTab > li {
    background: #eaf2ff;
}

.nav-tabs > li.tabLeft {
    margin: 0 1.5% 0 0;
}

.nav-tabs > li.tabRight {
    margin: 0 0 0 1.5%;
}

.nav-tabs > li.tabMid {
    margin: 0 0 0 0;
}

.nav-tabs > li:hover {
    background: #eaf2ff;
    box-shadow: 2px 2px 2px #a8a8a8;
}

.nav-tabs.innerTab > li:hover {
    background: #ffffff;
}

.nav-tabs > li.shaded {
    background: #eaf2ff;
    box-shadow: 2px 2px 2px #a8a8a8;
}

.nav-tabs > li.unshaded {
    background: #ffffff;
    box-shadow: 2px 2px 2px #a8a8a8;
}

.nav-tabs > li > a {
    padding: 5% 0 6% 0;
    border-radius: inherit;
    font-size: calc(5px + 1.1vw);
    z-index: 1;
    text-decoration: none;
    color: #033482;
}

.tab-content {
    position: relative;
    color: #000000;
    background-color: #eaf2ff;
    padding: 2vh 2vw;
    /*box-shadow: 3px 4px 3px #a8a8a8;*/
    z-index: 2;
    /*border-radius: 8px 8px 8px 8px;*/
    border-radius: 0.5vh 0.5vh 0.5vh 0.5vh;
    /*border: 1px solid grey;*/
    box-shadow: 2px 2px 2px #a8a8a8;
}

.tab-content.innerTab {
    background: #ffffff;
}

.tab-content > .tab-pane:not(.active),
.pill-content > .pill-pane:not(.active) {
    display: block;
    overflow: hidden;
    visibility: hidden;
    height: 0;
}

.tab-content > .tab-pane.active,
.pill-content > .pill-pane.active {
    display: block;
    visibility: visible;
}

h3.section-sub-head {
    width: 100%;
    margin: 4vh 0 2vh 0;
    padding: 0.5vh 0 0.5vh 0;
    text-align: center;
    font-size: 1.8vw;
    background: #eaf2ff;
    color: #033482;
}

.section-sub-content {
    margin-top: 30px;
    margin-bottom: 50px;
}

i.fa-chevron-down {
    position: absolute;
    right: 10px;
    top: 6px;
    transition-delay: 0.1s;
    transition: transform 0.4s ease-in-out;
}

.section-sub-head:not(.collapsed) i.fa-chevron-down {
    transform: rotate(-180deg);
}

.section-extra-head-container {
    display: table;
    margin: 30px auto 10px auto;
}

.section-extra-head {
    border: solid 1px #033482;
    border-radius: 18px;
    color: #033482;
    box-shadow: none;
    font-size: calc(4px + 0.95vw);
    text-align: center;
}

.section-extra-head:hover {
    background-color: #eaf2ff;
}

.section-extra-head.innerButton:hover {
    background-color: #ffffff;
}

.extra-content {
    /* Indicates a drop down box to hide stuff */
    background: #eaf2ff;
    padding: 25px 40px;
    border-radius: 5px;
    text-align: justify;
    margin-bottom: 30px;
}


.extra-content.innerECC {
    /* Indicates a drop down box to hide stuff */
    background: #ffffff;
}

.outerVisGuideContainer {
    padding-left: 2vw;
}

.first-sub-head {
    margin: 0 0 20px 0 !important;
}

.journeyImage {
    width: 80%;
    margin: 2vh auto 1vh;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

/* RIGHT SIDE STYLES */

.right {
    width: 67vw;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
}

#rightloadSpace {
    flex: 1 1 auto;
    width: inherit;
    z-index: -1;
    background: #ffffff;
    transition: opacity 0.15s;
    opacity: 1;
}

.fullRightLoadSpace {
    width: 100vw !important;
    height: 100vh;
    position: relative;
    left: -33vw;
    z-index: 10;
}

.rightLoadInterim {
    opacity: 0 !important;
}

#banner-dummy {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 4vh;
    min-height: 30px;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 1vh 2.5vh #b1b1b1;
    z-index: 5;
}

.banner {
    display: flex;
    flex: 0 0 auto;
    justify-content: flex-end;
    align-items: center;
    height: 4vh;
    min-height: 30px;
    width: 67vw;
    /*position: fixed;*/
    top: 0;
    right: 0;
    background: linear-gradient(
            90deg,
            #003E74 0%,
            #37578b 15%,
            #37578b 100%
    );
    color: #ffffff;
    z-index: 6;
}

#banner-dummy a:hover {
    cursor: pointer;
    opacity: 0.75;
}

#journeyToggle {
    height: inherit;
    min-height: 30px;
    width: 40px;
    position: absolute;
    left: 33vw;
    top: 0;
    border-left: solid 6px #003E74;
    border-radius: 0 5px 5px 0;
    background: #37578b;
    z-index: 9;
}

#navBlock {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 0;
    height: inherit;
    min-height: 30px;
    position: absolute;
    right: 40px;
    background: #37578b;
    color: #ffffff;
    overflow: hidden;
    font-size: calc(4px + 0.95vw);
    white-space: nowrap;
    transition-delay: 0.15s !important;
    transition: width 0.3s ease-in-out;
}

.navBlockActive {
    width: 33vw !important;
    cursor: pointer;
}

.navBlockActive:hover {
    font-size: calc(5px + 1vw) !important;
}

.innerJourneyToggle {
    position: absolute;
    right: 0;
}

#journeyToggle .chevron-holder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 15px;
    transition: transform 0.3s ease-in-out;
}

#journeyToggle .chevron-holder:hover {
    cursor: pointer;
    font-size: 20px;
}

#journeyToggle .chevron-holder.rotated {
    transform: rotate(180deg);
}

#vis-title {
    flex-basis: 0;
    flex-grow: 1;
    min-height: 30px;
    margin: 0;
    padding: 0;
    position: fixed;
    text-align: center;
    vertical-align: middle;
    font-weight: bolder;
    left: 33vw;
    right: 0;
    background: none;
    color: #ffffff;
    font-size: 22pt;
    letter-spacing: 2pt;
}

#vis-logo {
    height: 2.7vh;
    min-height: 18px;
    margin-right: 7px;
}

#vis-logo img {
    width: auto;
}

#loadwait {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner-border {
    width: 2vh;
    height: 2vh;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1vh;
    margin-top: -1vh;
    z-index: -10;
}

.scriptSpace {
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
}

/* TRANSITION STYLES */

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
    opacity: 0;
}

/* IMPORTED STYLE FROM LEARNING EXPERIENCE TEAM */

.divclass {
    width: inherit;
}
.transition-container {
    width: 100%;
    height: 100%;
    position: relative;
    background: #ffffff;
    overflow-y: hidden;
    overflow-x: hidden;
}

.rightload {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
}

/* ///// SECTION 0 ///// */

#loadout0 {
}

#loadout0 #graph0Sec0 {
    width: 94vw;
    height: 80vh;
    position: absolute;
    left: 3vw;
    top: 3vh;
}

#loadout0 .partial-sliders-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0;
    position: absolute;
    left: 3vw;
    bottom: 0;
    width: 94vw;
    height: 15vh;
}

#loadout0 .slider-label {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: flex-start;
    font-size: 2.2vw;
    text-align: left;
    padding-left: 8px;
    padding-bottom: 0;
    margin: 0;
    padding-top: 0;
    flex: 0.3 1 auto;
}

#loadout0 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
}

#loadout0 .sliderMin, #loadout0 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout0 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

/* ////// SECTION 1 ////// */

#loadout1 {
}

#loadout1 #graph1Sec1 {
    width: 60vw;
    height: 80vh;
    position: absolute;
    left: 3vw;
    top: 3vh;
    padding: 1%;
}

#loadout1 .overall-sliders-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    right: 3vw;
    top: 5vh;
    width: 30vw;
    height: 90vh;
}

#loadout1 .partial-sliders-container {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    max-height: 25vh;
}

#loadout1 .slider-label {
    font-size: calc(12px + 1vw);
    text-align: left;
    padding-left: 8px;
    margin-top: 2vh;
    padding-top: 0;
    flex: 1 0 auto;
}

#loadout1 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
}

#loadout1 .sliderValue {
    width: 60px;
    flex: 0 0 60px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout1 .inputs {
    height: 40px;
    flex: 1 1 auto;
}


#loadout1 .graphcolor1 {
    border-left: solid 5px rgb(213, 0, 50);
    color: rgb(213, 0, 50);
}

#loadout1 .graphcolor2 {
    border-left: solid 5px rgb(0, 0, 255);
    color: rgb(0, 0, 255);
}

#loadout1 .graphcolor3 {
    border-left: solid 5px rgb(0, 128, 0);
    color: rgb(0, 128, 0);
}

#loadout1 #vectorComponentsCustom {
    width: 60vw;
    position: absolute;
    left: 3vw;
    bottom: 6vh;
    padding: 1%;
    text-align: center;
    font-size: calc(5px + 1.1vw);
}

#loadout1 #popup1 {
    width: 60vw;
    position: absolute;
    left: 3vw;
    bottom: 6vh;
    padding: 1%;
    text-align: center;
    color: white;
    background-color: #D50032;
    font-size: calc(8px + 0.8vw);
}

/* ////// SECTION 2 ////// */

/* SUB-SECTION 1 */

#loadout2sub0 {
}

#loadout2sub0 #graph0Sec2 {
    width: 94vw;
    height: 60vh;
    position: absolute;
    left: 3vw;
    top: 7.5vh;
}

#loadout2sub0 #scrollSec2Sub1 {
    width: 100vw;
    height: 5vh;
    position: absolute;
    top: 2.2vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#loadout2sub0 #SelectSec2Sub1 {
    margin: 0 0 0 10px;
    padding: 0;
}

#loadout2sub0 #subSecTitle {
    display: none;
    width: 100vw;
    position: absolute;
    top: 2.2vh;
    text-align: center;
}

#loadout2sub0 .overall-sliders-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 3.9vw;
    bottom: 0;
    width: 90vw;
    height: 27vh;
}

#loadout2sub0 .partial-sliders-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0;
}

#loadout2sub0 .slider-label {
    font-size: 1.8vw;
    text-align: left;
    padding-left: 8px;
    padding-bottom: 0;
    margin: 0;
    padding-top: 0;
    flex: 0.5 1 0;
    vertical-align: middle;
}

#loadout2sub0 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 0;
}

#loadout2sub0 .sliderMin, #loadout2sub0 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout2sub0 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

/* SUB-SECTION 2 */

#loadout2sub1 {
}

#loadout2sub1 #graph1Sec2 {
    width: 55vw;
    height: 45vh;
    position: absolute;
    left: 3.9vw;
    top: 4.3vh;
}

#loadout2sub1 #graph2Sec2 {
    width: 55vw;
    height: 45vh;
    position: absolute;
    left: 3.9vw;
    bottom: 2.2vh;
}

#loadout2sub1 .overall-sliders-container {
    width: 35vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    right: 2.3vw;
    top: 5vh;
}

#loadout2sub1 .partial-sliders-container {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    max-height: 20vh;
}

#loadout2sub1 .slider-label {
    font-size: calc(12px + 1vw);
    text-align: left;
    padding-left: 8px;
    margin: 0;
    padding-top: 0;
    flex: 1 0 auto;
}

#loadout2sub1 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
}

#loadout2sub1 .sliderMin, #loadout2sub1 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout2sub1 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

/* ///// SECTION 3 ///// */

#loadout3 {
}

#loadout3 #graph1Sec3 {
    width: 94vw;
    height: 60vh;
    position: absolute;
    left: 3vw;
    top: 10vh;
}

#scrollSec3 {
    width: 100%;
    height: 5%;
    position: absolute;
    top: 2.2%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#SelectSec3 {
    margin: 0 0 0 10px;
    padding: 0;
}

#loadout3 .overall-sliders-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 5vw;
    bottom: 0;
    width: 45vw;
    height: 25vh;
}

#loadout3 .partial-sliders-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 0;
}

#loadout3 .slider-label {
    font-size: calc(6px + 0.8vw);
    text-align: left;
    padding-left: 8px;
    margin: 0;
    padding-top: 0;
    flex: 0.5 1 0;
}

#loadout3 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 0;
}

#loadout3 .sliderMin, #loadout3 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout3 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

#equationSpace {
    position: absolute;
    right: 7%;
    bottom: 3%;
    width: 35%;
    height: 22%;
}

.equationContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    max-width: 100%;
}

img {
    height: 100%;
    max-width: 100%;
}

/* ///// SECTION 4 ///// */

#loadout4 {
}

#loadout4 #graph1Sec4 {
    width: 45vw;
    height: 45vh;
    position: absolute;
    left: 2.5vw;
    top: 2.5vh;
}

#loadout4 #graph2Sec4 {
    width: 45vw;
    height: 45vh;
    position: absolute;
    left: 2.5vw;
    bottom: 2.5vh;
}

#loadout4 .inputsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 2.5vw;
    top: 5.3vh;
    width: 45vw;
    height: 90vh;
}

#loadout4 .selectorContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
    width: 100%;
}

#loadout4 .overall-sliders-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 4 1 0;
    width: 100%;
}

#loadout4 .partial-sliders-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 1 0 auto;
    max-height: 25%;
}

#loadout4 .slider-label {
    font-size: calc(12px + 1vw);
    text-align: left;
    padding-left: 8px;
    margin: 0;
    padding-top: 0;
    flex: 1 0 auto;
    left: 0;
}

#loadout4 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 auto;
}

#loadout4 .sliderMin, #loadout4 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout4 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

/* ///// SECTION 5 ///// */

#loadout5 {
}

#loadout5 #graph1Sec5 {
    width: 45vw;
    height: 45vh;
    position: absolute;
    left: 2.5vw;
    top: 2.5vh;
}

#loadout5 #graph2Sec5 {
    width: 45vw;
    height: 45vh;
    position: absolute;
    left: 2.5vw;
    bottom: 2.5vh;
}

#loadout5 #graph3Sec5 {
    width: 45vw;
    height: 45vh;
    position: absolute;
    right: 2.5vw;
    bottom: 2.5vh;
}

#loadout5 #scrollSec5 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 0;
    margin-bottom: 2vh;
}

#loadout5 #scrollSec5 * {
    flex: 0 0 auto;
    margin: 0 10px;
}

#loadout5 #inputSubContainerSec5 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 0;
    margin-bottom: 2vh;
}

#loadout5 #inputSubContainerSec5 * {
    flex: 0 0 auto;
    margin: 0 10px;
}

#loadout5 #coefficientSubContainerSec5 {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1 1 0;
    margin-bottom: 2vh;
}

#loadout5 #coefficientSubContainerSec5 * {
    flex: 0 0 auto;
    margin: 10px 10px;
}

#loadout5 .inputsContainer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    top: 5vh;
    right: 2.5vw;
    width: 45vw;
    height: 40vh;
}

#loadout5 * {
    flex: 1 1 0;
}

#loadout5 .partial-sliders-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    align-items: center;
}

#loadout5 .slider-label {
    font-size: calc(6px + 1vw);
    text-align: left;
    padding-left: 8px;
    margin: 0;
    padding-top: 0;
    flex: 0.5 1 0;
    left: 0;
}

#loadout5 .slider {
    display: flex;
    align-items: center;
    flex: 1 1 0;
}

#loadout5 .sliderMin, #loadout5 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout5 .inputs {
    height: 40px;
    flex: 1 1 auto;
}

/* ///// SECTION 6 ///// */

#loadout6 {
}

#loadout6 #Top_Hat_Graph {
    width: 45vw;
    height: 75vh;
    position: absolute;
    top: 6vh;
    left: 3vw;
}

#loadout6 #Fourier_Transform_Graph {
    width: 45vw;
    height: 75vh;
    position: absolute;
    top: 6vh;
    right: 3vw;
}

#loadout6 .partial-sliders-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 0;
    align-items: center;
    width: 94vw;
    height: 15vh;
    position: absolute;
    bottom: 3vh;
    left: 3vw;
}

#loadout6 .slider-label {
    font-size: calc(6px + 1vw);
    text-align: left;
    margin: 0;
    padding-top: 0;
    flex: 0.5 1 0;
    left: 0;
}

#loadout6 .slider {
    display: flex;
    align-items: center;
    flex: 1 0 0;
}

#loadout6 .sliderMin, #loadout6 .sliderMax {
    margin-top: 30px;
    width: 40px;
    flex: 0 0 40px;
    text-align: center;
    line-height: 40px;
    vertical-align: middle;
}

#loadout6 .inputs {
    height: 40px;
    flex: 1 1 auto;
}
</style>
