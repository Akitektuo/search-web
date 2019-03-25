const removeClass = (selector, className) => {
    const element = document.querySelector(selector);
    if (!element) {
        return;
    }
    if (element.classList) {
        element.classList.remove(className);
        return;
    }
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

const addClass = (element, className) => {
    if (!element) {
        return;
    }
    if (element.classList) {
        element.classList.add(className);
        return;
    }
    element.className += ` ${className}`;
}

const searchAndHighlight = (search) => {
    removeClass(".highlight", "highlight");
    removeMarkedSpans();
    if (!search) {
        return false;
    }
    const selector = ".search-area";
    const elem = document.querySelector(selector);
    if (!elem) {
        console.assert(elem, `No element with the class .search-area was found`);
        return false;
    }
    let searchRegex = new RegExp(search, "ig");
    const matches = elem.textContent.match(searchRegex);
    if (matches == null || matches.length < 1) {
        return false;
    }
    removeClass(".highlight", "highlight");
    const span = document.querySelector("span.marked");
    if (span) {
        span.outerHTML = span.innerHTML;
    }
    if (search === "&") {
        search = "&amp;";
        searchRegex = new RegExp(search, "ig");
    }
    elem.innerHTML = elem.innerHTML.replace(searchRegex, (word) => {
        return `<span class="marked">${word}</span>`;
    });
    const firstMarked = document.querySelector("span.marked:first-child");
    addClass(firstMarked, "highlight");
    
    // let i = 0;
    // document.querySelector(".image-left").addEventListener("click", () => {
    //     i--;
    //     if (i < 0) {
    //         i = document.querySelector(".marked").length - 1;
    //     }
    // });

    const firstHighlight = document.querySelector(".highlight:first-child");
    if (!firstHighlight) {
        return false;
    }
    firstHighlight.scrollIntoView({
        block: "nearest"
    });
    return true;
}

const removeMarkedSpans = () => {
    const span = document.querySelectorAll("span.marked");
    if (!span) {
        return;
    }
    if (span.length) {
        span.forEach((item) => item.outerHTML = item.innerHTML);
    }
}

window.onload = () => {
    const inputSearch = document.querySelector("input.input-search");
    inputSearch.addEventListener("input", () => {
        if (!searchAndHighlight(inputSearch.value)) {
            console.log("No results found");
        }
    });
    document.querySelector(".image-left").addEventListener("click", () => {
        console.log("Clicked!");
    });
};