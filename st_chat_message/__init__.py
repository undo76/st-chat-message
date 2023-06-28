import os
from typing import Optional, Union

import streamlit.components.v1 as components

try:
    from typing import Literal
except ImportError:
    from typing_extensions import Literal

_RELEASE = True
COMPONENT_NAME = "st_chat_message"

# use the build instead of development if release is true
if _RELEASE:
    root_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(root_dir, "frontend/out")

    _st_chat_message = components.declare_component(
        COMPONENT_NAME,
        path=build_dir
    )
else:
    _st_chat_message = components.declare_component(
        COMPONENT_NAME,
        url="http://localhost:3000/component/st_chat_message.st_chat_message"
    )

# data type for avatar style
AvatarStyle = Literal[
    "adventurer",
    "adventurer-neutral",
    "avataaars",
    "avataaars-neutral",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "bottts",
    "bottts-neutral",
    "croodles",
    "croodles-neutral",
    "fun-emoji",
    "icons",
    "identicon",
    "initials",
    "lorelei",
    "lorelei-neutral",
    "micah",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
    "shapes",
    "thumbs",
]


def message(message: str,
            is_user: Optional[bool] = False,
            avatar_style: Optional[AvatarStyle] = None,
            logo: Optional[str] = None,
            seed: Optional[Union[int, str]] = 88,
            key: Optional[str] = None,
            partial: Optional[bool] = False):
    """
    Creates a new instance of streamlit-chat component

    Parameters
    ----------
    message: str
        The message to be displayed in the component
    is_user: bool
        if the sender of the message is user, if `True` will align the
        message to right, default is False.
    avatar_style: Literal or None
        The style for the avatar of the sender of message, default is bottts
        for not user, and pixel-art-neutral for user.
        st-chat uses https://www.dicebear.com/styles for the avatar
    logo: Literal or None
        The logo to be used if we do not wish Avatars to be used. This is useful
        if we want the chatbot to be branded
    seed: int or str
        The seed for choosing the avatar to be used, default is 42.
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.
    partial: bool or None
        Indicates that the message is partial, and will be updated later (for
        example, if the message is being streamed).

    Returns: None
    """
    if logo:
        _st_chat_message(message=message, seed=seed, isUser=is_user, logo=logo, key=key)
    else:
        if not avatar_style:
            avatar_style = "fun-emoji" if is_user else "bottts"
        _st_chat_message(message=message, seed=seed, isUser=is_user, avatarStyle=avatar_style, key=key, partial=partial)

