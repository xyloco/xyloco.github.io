
async function loadHeader() {

    const container =
        document.getElementById("header-container");

    if (!container) {
        console.error(
            "Header container not found: #header-container"
        );
        return;
    }


    try {

        const isPage =
            window.location.pathname.includes("/pages/");


        const headerPath =
            isPage
                ? "../injected/header.html"
                : "injected/header.html";


        const response =
            await fetch(headerPath);


        if (!response.ok) {

            throw new Error(
                `Failed to load header: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();


        const header =
            document.getElementById("site-header");

        const dropdown =
            document.getElementById("rizal-dropdown");

        const toggle =
            document.getElementById(
                "rizal-dropdown-toggle"
            );


        if (!header) {
            console.error(
                "Header element not found: #site-header"
            );
            return;
        }


        if (dropdown && toggle) {

            toggle.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();
                    event.stopPropagation();


                    const isOpen =
                        dropdown.classList.toggle("open");


                    toggle.setAttribute(
                        "aria-expanded",
                        String(isOpen)
                    );

                }
            );


            document.addEventListener(
                "click",
                (event) => {

                    if (
                        !dropdown.contains(
                            event.target
                        )
                    ) {

                        dropdown.classList.remove(
                            "open"
                        );


                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }
            );


            document.addEventListener(
                "keydown",
                (event) => {

                    if (event.key !== "Escape")
                        return;


                    dropdown.classList.remove(
                        "open"
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        } else {

            console.error(
                "Rizal dropdown elements were not found."
            );

        }


        let lastScrollY =
            window.scrollY;


        window.addEventListener(
            "scroll",
            () => {

                const currentScrollY =
                    window.scrollY;


                if (currentScrollY <= 10) {

                    header.classList.remove(
                        "hidden"
                    );

                    lastScrollY =
                        currentScrollY;

                    return;

                }


                if (
                    currentScrollY >
                    lastScrollY
                ) {

                    header.classList.add(
                        "hidden"
                    );

                } else {

                    header.classList.remove(
                        "hidden"
                    );

                }


                lastScrollY =
                    currentScrollY;

            },
            {
                passive: true
            }
        );


    } catch (error) {

        console.error(
            "Failed to load header:",
            error
        );

    }

}


if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        loadHeader
    );

} else {

    loadHeader();

}