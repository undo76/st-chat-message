import time

import streamlit as st

from st_chat_message import message

msg1 = r"""
Hi! I pass butter and display some **markdown**, including code:

```python
import streamlit as st
from st_chat_message import message

message("My message")
message("Hello bot!", is_user=True)  # aligns the message to the right 
```

I also can display $\LaTeX$ formulas:

$$
\begin{aligned}
\frac{d}{dx} \left( \int_{a}^{x} f(u)\,du\right) &= f(x) \
\frac{d}{dx} \left( \int_{x}^{b} f(u)\,du\right) &= -f(x) \
\end{aligned}
$$

I can also display tabular data.

### Maxwell's equations

| Equation | Name |
| --- | --- |
| $\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$ | Gauss's law |
| $\nabla \cdot \mathbf{B} = 0$ | Gauss's law for magnetism |
| $\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}$ | Faraday's law of induction |
| $\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}$ | Ampère's circuital law |

"""

if "n_chars" not in st.session_state:
    st.session_state.n_chars = 1

message(msg1[:st.session_state.n_chars], partial=st.session_state.n_chars < len(msg1), key="message_1")

# Simulate streaming
if st.session_state.n_chars < len(msg1):
    st.session_state.n_chars += 1
    time.sleep(0.02)
    st.experimental_rerun()
