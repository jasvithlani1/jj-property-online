import pexpect
import sys

print("Starting deploy script...")
child = pexpect.spawn('npx sanity deploy', encoding='utf-8')
child.logfile = sys.stdout

child.expect('Select existing studio hostname')
# Send arrow down
child.send('\x1b[B')
child.sendline()

child.expect(pexpect.EOF, timeout=120)
