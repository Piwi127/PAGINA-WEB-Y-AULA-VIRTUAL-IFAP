#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

def clean_certificate_styles():
    """Remove certificate styles from styles.css since they're now in certificates.css"""

    with open('styles.css', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the certificate styles section
    start_pattern = r'/\* === ESTILOS PARA EL SISTEMA DE CERTIFICADOS === \*/'
    end_pattern = r'/\* === ESTILOS PARA CERTIFICACIONES EN PROGRESO === \*/'

    start_match = re.search(start_pattern, content)
    end_match = re.search(end_pattern, content)

    if start_match and end_match:
        start_pos = start_match.start()
        end_pos = end_match.start()

        # Keep only the header comment
        before = content[:start_pos]
        header = content[start_pos:start_match.end()] + '\n/* Movidos a assets/css/certificates.css para mejor organización */\n'
        after = content[end_match.start():]

        new_content = before + header + after

        with open('styles.css', 'w', encoding='utf-8') as f:
            f.write(new_content)

        print("Certificate styles successfully moved to separate file")
        return True
    else:
        print("Could not find certificate styles section")
        return False

if __name__ == "__main__":
    clean_certificate_styles()
